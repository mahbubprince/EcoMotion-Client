// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// import { auth } from "../firebase/Firebase.config";
// import { AuthContext } from "./AuthContext";

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setloading] = useState(true);
//   const googleProvider = new GoogleAuthProvider();

//   const createUserWithEmailAndPasswordFunc = (email, password) => {
//     setloading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signInWithEmailAndPasswordFunc = (email, password) => {
//     setloading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const signInWithPopupFunc = () => {
//     return signInWithPopup(auth, googleProvider);
//   };
//   const sendPasswordResetEmailFunc = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   useEffect(() => {
//     const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setloading(false);
//     });
//     return () => {
//       unsubcribe();
//     };
//   }, []);

//   const logout = () => {
//     setloading(false);
//     return signOut(auth);
//   };
//   const updateProfilefunc = (displayName, photoURL) => {
//     return updateProfile(auth.currentUser, {
//       displayName,
//       photoURL: photoURL || "https://i.ibb.co/2NsfGNv/default-avatar.png",
//     });
//   };

//   const info = {
//     user,
//     setUser,
//     loading,
//     setloading,
//     createUserWithEmailAndPasswordFunc,
//     signInWithEmailAndPasswordFunc,
//     signInWithPopupFunc,
//     logout,
//     updateProfilefunc,
//     sendPasswordResetEmailFunc,
//   };
//   return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;































import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/Firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // 🔹 Create user with email/password
  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login with email/password
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Google login
  const signInWithPopupFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔹 Send password reset email
  const sendPasswordResetEmailFunc = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 🔹 Update displayName & photo
  const updateProfilefunc = (displayName, photoURL) => {
    const defaultPhoto = "https://i.ibb.co/2NsfGNv/default-avatar.png";
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL: photoURL || defaultPhoto,
    });
  };

  // 🔹 Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔹 Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const info = {
    user,
    setUser,
    loading,
    setLoading,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithPopupFunc,
    logout,
    updateProfilefunc,
    sendPasswordResetEmailFunc,
  };

  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

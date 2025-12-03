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
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/Firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPasswordFunc = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithPopupFunc = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const sendPasswordResetEmailFunc = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);

  const logout = () => {
    setloading(false);
    return signOut(auth);
  };
  const updateProfilefunc = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL: photoURL || "https://i.ibb.co/2NsfGNv/default-avatar.png",
    });
  };

  const info = {
    user,
    setUser,
    loading,
    setloading,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithPopupFunc,
    logout,
    updateProfilefunc,
    sendPasswordResetEmailFunc,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

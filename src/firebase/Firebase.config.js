// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcpPm1aUmFtKMbVLi5eE0VFZPCqUiV8Vg",
  authDomain: "ecomotion-ca479.firebaseapp.com",
  projectId: "ecomotion-ca479",
  storageBucket: "ecomotion-ca479.firebasestorage.app",
  messagingSenderId: "1077802429380",
  appId: "1:1077802429380:web:47b04ffef3136bb8b61291"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
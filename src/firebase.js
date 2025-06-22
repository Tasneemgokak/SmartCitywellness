// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "--------------------------",
  authDomain: "smart-city-ea357.firebaseapp.com",
  projectId: "smart-city-ea357",
  storageBucket: "smart-city-ea357.appspot.com",
  messagingSenderId: "----------",  // Real value
  appId: "-------------------",  // Real value
  measurementId: "----------------"  // Real value
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get authentication and provider
 const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

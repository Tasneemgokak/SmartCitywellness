// src/firebase.js




import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWdKQjkf6Rh_o72k7zJA7DHRIlAf5SP_M",
  authDomain: "smart-city-ea357.firebaseapp.com",
  projectId: "smart-city-ea357",
  storageBucket: "smart-city-ea357.appspot.com",
  messagingSenderId: "232623747138",  // ✅ Real value
  appId: "1:232623747138:web:ee422244b80ed817a4fddb",  // ✅ Real value
  measurementId: "G-1ABCDEF2G"  // ✅ Real value
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get authentication and provider
 const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 

export { auth, provider, db };

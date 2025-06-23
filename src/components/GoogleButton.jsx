// src/components/GoogleButton.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import googleLogo from "../assets/google-logo.png";

const GoogleButton = () => {
  const navigate = useNavigate(); // 👈 useNavigate hook from react-router

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      navigate("/home"); // ✅ redirect after login
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <button className="google-btn" onClick={handleGoogleSignIn}>
      <img src={googleLogo} alt="Google Logo" className="google-icon" />
      Continue with Google
    </button>
  );
};

export default GoogleButton;

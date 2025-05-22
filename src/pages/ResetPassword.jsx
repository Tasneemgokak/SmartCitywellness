// ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, fetchSignInMethodsForEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Auth.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const auth = getAuth();
    try {
      // Step 1: Check if user exists
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        setError("Admin account not found.");
        return;
      }

      // Step 2: Login temporarily to allow password update
      const tempPassword = prompt("Please enter your current admin password to verify.");
      if (!tempPassword) {
        setError("Current password is required to reset.");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, tempPassword);
      const user = userCredential.user;

      // Step 3: Update password
      await updatePassword(user, newPassword);
      setMessage("✅ Password has been successfully updated.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset error:", err.message);
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-box">
        <h2>Reset Admin Password</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn" type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

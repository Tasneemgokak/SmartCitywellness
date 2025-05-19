// src/pages/ResetAdminPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Auth.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const q = query(collection(db, "admin"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("❌ Admin email not found.");
        return;
      }

      const adminDoc = snapshot.docs[0];
      await updateDoc(adminDoc.ref, { password: newPassword });

      setMessage("✅ Password updated successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect to login
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update password.");
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
          <button className="btn" type="submit">
            Update Password
          </button>
          <button type="button" className="back-btn" onClick={() => navigate("/")}>
  ← Back
</button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

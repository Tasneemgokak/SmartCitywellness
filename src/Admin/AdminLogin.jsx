import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Auth.css";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = credentials;
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const tokenResult = await user.getIdTokenResult();

    // Check if user has 'admin' claim
    if (tokenResult.claims.admin) {
      navigate("/admin-dashboard");
    } else {
      setError("Access denied. You are not an admin.");
    }
  } catch (err) {
    console.error("Login Error:", err.code, err.message);
    setError("Login failed. Please check credentials.");
  }
};


  const handleForgotPassword = async () => {
    const auth = getAuth();
    if (!credentials.email) {
      setError("Enter email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, credentials.email);
      alert("Reset email sent!");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email.");
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn" type="submit">
            Log In
          </button>
          <p className="auth-switch-text" onClick={handleForgotPassword}>
            Forgot Password?
          </p>
        </form>
        {/* <div className="auth-switch-text">
          Forgot Password? &nbsp;
            <Link to="/forgotpassword" className="link-style">
              Sign up
            </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AdminLogin;

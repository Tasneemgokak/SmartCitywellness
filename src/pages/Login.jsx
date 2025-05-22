// Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleButton from "../components/GoogleButton";
import "../styles/Auth.css";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleAdminChange = (e) =>
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAdmin", "false");
      navigate("/home");
    } catch (error) {
      console.error("User login failed:", error.message);
      setError("❌ " + error.message);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const { email, password } = adminCredentials;
    const auth = getAuth();

    try {
      const q = query(collection(db, "admin"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Admin email not found in Firestore");
        setError("❌ This email is not authorized as admin.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } catch (error) {
      console.error("Admin login failed:", error.message);
      setError("❌ " + error.message);
    }
  };

 

  return (
    <div className="auth-background">
      <div className="auth-box">
<<<<<<< HEAD
        <h2>{showAdminForm ? "Admin Login" : "User Login"}</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${!showAdminForm ? "active" : ""}`}
            onClick={() => setShowAdminForm(false)}
          >
            User Login
          </button>
          <button
            className={`toggle-btn ${showAdminForm ? "active" : ""}`}
            onClick={() => setShowAdminForm(true)}
          >
            Admin Login
          </button>
        </div>

        {!showAdminForm ? (
          <form onSubmit={handleUserLogin}>
=======
        <h2>User Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <div className="input-wrapper">
>>>>>>> origin/MD2
            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <button className="btn" type="submit">
              Log In
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin}>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={adminCredentials.email}
              onChange={handleAdminChange}
              required
            />
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Admin Password"
                value={adminCredentials.password}
                onChange={handleAdminChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                
              </span>
            </div>
            <button className="btn" type="submit">
              Admin Log In
            </button>
           <button
  type="button"
  className="link-style forgot-password"
  onClick={() => navigate("/resetpassword")}
>
  Forgot Password?
</button>

          </form>
        )}

        {!showAdminForm && (
          <div className="auth-switch-text">
            Don't have an account? &nbsp;
            <Link to="/signup" className="link-style">
              Sign up
            </Link>
          </div>
        )}

        <GoogleButton />

        {/* ✅ Admin Login Button */}
        <button
          className="admin-login-btn"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>

      </div>
    </div>
  );
};

export default Login;

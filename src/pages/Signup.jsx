import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import GoogleButton from "../components/GoogleButton";
import "../styles/Auth.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
 


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdminSignup, setIsAdminSignup] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const { name, email, password } = formData;

  try {
    // 🔍 Check if this email exists in the admin list in Firestore
    let isAdmin = false;

    if (isAdminSignup) {
      const q = query(collection(db, "admin"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      isAdmin = !querySnapshot.empty;

      if (!isAdmin) {
        setError("This email is not authorized for admin signup.");
        setLoading(false);
        return;
      }
    }

    // ✅ Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    // Store admin flag and redirect
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    navigate(isAdmin ? "/dashboard" : "/home");

  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      setError("This email is already registered. Please log in.");
    } else if (err.code === "auth/invalid-email") {
      setError("Invalid email format.");
    } else {
      setError("Signup failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="auth-background">
      <div className="auth-box">
        <h2>{isAdminSignup ? "Admin Signup" : "Create an Account"}</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${!isAdminSignup ? "active" : ""}`}
            onClick={() => setIsAdminSignup(false)}
          >
            User Signup
          </button>
          <button
            className={`toggle-btn ${isAdminSignup ? "active" : ""}`}
            onClick={() => setIsAdminSignup(true)}
          >
            Admin Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {!isAdminSignup && (
          <div className="auth-switch-text">
            Already have an account? &nbsp;
            <Link to="/login" className="my-link-style">
              Log In
            </Link>
          </div>
        )}

        <GoogleButton />
      </div>
    </div>
  );
};

export default Signup;

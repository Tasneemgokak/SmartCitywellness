import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleButton from "../components/GoogleButton";
import "../styles/Auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = credentials;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Logged in as:', user.email);
      navigate('/home'); // Redirect to home page after successful login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during login:', errorCode, errorMessage);
    });
  };

  return (
    <div className="auth-background">
      <div className="auth-box">
        <h2>Login</h2>
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
        <div className="auth-switch-text">
          Don't have an account? &nbsp;
            <Link to="/signup" className="link-style">
              Sign up
            </Link>
        </div>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Login;
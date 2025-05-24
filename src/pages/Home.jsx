import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout(); // Navigation is now handled in AuthContext
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <span className="gradient-text">Hello, {currentUser?.displayName || currentUser?.email || "User"}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      
      <div className="home-buttons">
        <button onClick={() => navigate("/report")} className="home-button report-button">
          Report Issue
        </button>
        <button onClick={() => navigate("/feedback")} className="home-button feedback-button">
          Feedback
        </button>
        <button onClick={() => navigate("/complaint")} className="home-button complaint-button">
          Complaint
        </button>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import '../styles/ReportIssue.css'; // Make sure this exists and includes styling for .report-issue-container and .cyber-form

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGreenCombo = () => {
    navigate('/green-combo');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="report-issue-container">
      <h1 className="cyber-header">REPORT ANOMALY</h1>

      {user ? (
        <div className="cyber-form">
          <div className="terminal-line">
            &gt; USER_ID: <span className="glow-text">{user.email}</span>
          </div>
          <div className="terminal-line">
            &gt; STATUS: <span className="status-active">ACTIVE</span>
          </div>
          <div className="cyber-divider"></div>

          <div className="button-group">
            <button
              onClick={handleGreenCombo}
              className="cyber-button primary"
            >
              <span className="glow-text">INITIATE GREEN COMBO</span>
            </button>

            <button
              onClick={handleDashboard}
              className="cyber-button secondary"
            >
              <span>RETURN TO DASHBOARD</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="access-denied">
          <p>SYSTEM ALERT: UNAUTHORIZED ACCESS</p>
          <button
            onClick={() => navigate('/')}
            className="cyber-button"
          >
            <span>PROCEED TO LOGIN</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;

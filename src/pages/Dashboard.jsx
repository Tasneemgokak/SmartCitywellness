import React from 'react';
import { useAuth } from '../contexts/AuthContext/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-main">
      <h1 className="dashboard-title">Welcome to Your Cyber Dashboard</h1>
      
      <div className="dashboard-content">
        {user && (
          <>
            <div className="user-greeting">
              <h2>System Operator: <span>{user.displayName || user.email}</span></h2>
              <p className="access-level">Access Level: <span>Administrator</span></p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Active Reports</h3>
                <p className="stat-value">12</p>
                <p className="stat-change">↑ 2 from yesterday</p>
              </div>
              
              <div className="stat-card">
                <h3>Resolved Issues</h3>
                <p className="stat-value">24</p>
                <p className="stat-change">↑ 5 from yesterday</p>
              </div>
              
              <div className="stat-card">
                <h3>System Health</h3>
                <p className="stat-value">98%</p>
                <p className="stat-change">Optimal</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
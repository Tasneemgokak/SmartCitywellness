import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  

  // Check if the user is an admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [reportRes, feedbackRes, complaintRes] = await Promise.all([
        fetch('http://localhost:5000/api/reports'),
        fetch('http://localhost:5000/api/feedbacks'),
        fetch('http://localhost:5000/api/complaints'),
      ]);

      const reportData = await reportRes.json();
      const feedbackData = await feedbackRes.json();
      const complaintData = await complaintRes.json();

      console.log("Reports:", reportData);
      console.log("Feedbacks:", feedbackData);
      console.log("Complaints:", complaintData);

      reportData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      feedbackData.sort((a, b) => new Date(b.date) - new Date(a.date));
      complaintData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setReports(reportData);
      setFeedbacks(feedbackData);
      setComplaints(complaintData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  fetchData();
}, []);


  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>🛠 Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Reports Section */}
      <h3>📋 Waste Reports</h3>
      {reports.length === 0 ? (
        <p>No reports yet</p>
      ) : (
        <ul className="report-list">
          {reports.map((report, index) => (
            <li key={index} className="report-card">
              <p><strong>User:</strong> {report.user}</p>
              <p><strong>Description:</strong> {report.issue || "No description"}</p>
              {report.imageURL && <img src={report.imageURL} alt="Waste Report" />}
              {report.audioURL && <audio controls src={report.audioURL}></audio>}
              {report.location && <p><strong>Location:</strong> Lat: {report.location.lat}, Lng: {report.location.lng}</p>}
              <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Feedback Section */}
      <h3>💬 User Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedbacks yet</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((fb, idx) => (
            <li key={idx} className="feedback-card">
              <p><strong>Name:</strong> {fb.name}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Rating:</strong> {fb.rating} / 5</p>
              <p><strong>Message:</strong> {fb.message}</p>
              {fb.beforeImage && <img src={fb.beforeImage} alt="Before Clean" />}
              {fb.afterImage && <img src={fb.afterImage} alt="After Clean" />}
              <p><strong>Date:</strong> {new Date(fb.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Complaints Section */}
      <h3>📢 User Complaints</h3>
      {complaints.length === 0 ? (
        <p>No complaints yet</p>
      ) : (
        <ul className="complaint-list">
          {complaints.map((cp, idx) => (
            <li key={idx} className="complaint-card">
              <p><strong>User ID:</strong> {cp.userId}</p>
              <p><strong>Message:</strong> {cp.message}</p>
              {cp.reportId && <p><strong>Related Report ID:</strong> {cp.reportId}</p>}
              <p><strong>Date:</strong> {new Date(cp.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;

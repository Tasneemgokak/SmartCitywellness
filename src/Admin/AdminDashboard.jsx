import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ feedback: [], complaints: [], reports: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const tokenResult = await getIdTokenResult(user);
      if (tokenResult.claims.admin) {
        setIsAdmin(true);
        fetchAllData();
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [feedback, complaints, reports] = await Promise.all([
        axios.get("/api/admin/feedback"),
        axios.get("/api/admin/complaints"),
        axios.get("/api/admin/reports"),
      ]);
      setData({
        feedback: feedback.data,
        complaints: complaints.data,
        reports: reports.data,
      });
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    }
  };

  const handleViewDetails = (type, uid) => {
    navigate(`/admin/${type}/${uid}`);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/admin-login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  if (loading) return <div className="admin-msg">Loading...</div>;

  if (!isAdmin) return <div className="admin-msg">🔒 Access Denied: Admins only</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {["feedback", "complaints", "reports"].map((type) => (
        <div key={type} className="admin-section">
          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
          {data[type].length === 0 ? (
            <p>No entries yet.</p>
          ) : (
            <ul>
              {data[type].map((item) => (
                <li key={item.uid}>
                  <span className="uid" onClick={() => handleViewDetails(type, item.uid)}>
                    {item.uid}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

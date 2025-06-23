import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ feedback: [], complaints: [], reports: [] });
  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/admin-login");
        return;
      }

      try {
        const tokenResult = await getIdTokenResult(user);
        if (tokenResult.claims.admin) {
          setIsAdmin(true);
          await fetchAllData(user); // wait for data before removing loading
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error during admin check:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAllData = async (user) => {
    try {
      const token = await user.getIdToken();
      const [feedback, complaints, reports] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/admin/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/admin/reports", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setData({
        feedback: feedback.data,
        complaints: complaints.data,
        reports: reports.data,
      });
    } catch (error) {
      console.error("Failed to fetch admin data:", error.response?.data || error.message);
    }
  };

  const handleViewDetails = (type, id) => {
    navigate(`/admin/${type}/${id}`);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getItemId = (type, item) => {
    switch (type) {
      case "feedback":
        return item.feedbackId;
      case "complaints":
        return item.complaintId;
      case "reports":
        return item.reportId;
      default:
        return "unknown-id";
    }
  };

  // Loading & access control
  if (loading) return <div className="admin-msg">Loading...</div>;
  if (!isAdmin) return <div className="admin-msg">🔒 Access Denied: Admins only</div>;

  // Dashboard UI
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

     {["reports", "feedback", "complaints"].map((type) => (
  <div key={type} className={`admin-section section-${type}`}>
    <h3 className={`section-title title-${type}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </h3>
    {data[type].length === 0 ? (
      <p className="empty-msg">No entries yet.</p>
    ) : (
      <ul className={`list list-${type}`}>
        {data[type].map((item) => {
          const id = getItemId(type, item);
          return (
            <li key={id} className={`list-item item-${type}`}>
              <span className={`uid uid-${type}`} onClick={() => handleViewDetails(type, id)}>
                {id}
              </span>
            </li>
          );
        })}
      </ul>
    )}
  </div>
))}
      <div className="admin-footer">
        <p>Admin Dashboard © 2025</p>
      </div>  
    </div>
  );
};

export default AdminDashboard;

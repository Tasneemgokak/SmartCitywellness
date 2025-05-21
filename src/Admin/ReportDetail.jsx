import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "../styles/admin.css";

const ReportDetail = () => {
  const { reportId } = useParams();  // Get reportId param here correctly
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const token = await user.getIdToken();
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/reports/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(res.data);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId, navigate]);

  if (!report) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <h2>Report Details</h2>
      <p><strong>Issue:</strong> {report.issue}</p>
      <p><strong>Location:</strong> Lat {report.location?.lat}, Lng {report.location?.lng}</p>
      <p><strong>Date:</strong> {new Date(report.createdAt || report.date).toLocaleString()}</p>

      {report.imagePath && (
        <div>
          <strong>Image:</strong><br />
          <img src={report.imagePath} alt="Report" className="preview-img" />
        </div>
      )}

      {report.prediction && (
        <p><strong>Predicted Waste Category:</strong> {report.prediction}</p>
      )}
    </div>
  );
};

export default ReportDetail;

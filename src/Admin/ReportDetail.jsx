import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { ArrowLeft } from 'lucide-react'; // Optional icon
import "../styles/Styles/reportDetail.css"; // Updated style


// config.js
export const BASE_URL = "http://localhost:5000";

const ReportDetail = () => {
  const { reportId } = useParams();
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
  

  if (!report) return <div className="loading">Loading report details...</div>;
 


  return (
    <div className="report-bg">
      <div className="report-card">
        <h2 className="report-title">Report Details</h2>

        <div className="report-field"><strong>Issue:</strong> {report.issue}</div>

        {report.location?.lat && report.location?.lng && (
          <div className="report-field">
            <strong>Location:</strong> Lat {report.location.lat}, Lng {report.location.lng}
            <iframe
              className="mini-map"
              src={`https://maps.google.com/maps?q=${report.location.lat},${report.location.lng}&z=15&output=embed`}
              loading="lazy"
              title="map"
            ></iframe>
          </div>
        )}

        <div className="report-field">
          <strong>Date:</strong> {new Date(report.createdAt || report.date).toLocaleString()}
        </div>

        {report.prediction && typeof report.prediction === 'string' && (
        <div className="badge">
          Waste Category:{" "}
          <span className={`badge-color ${report.prediction.toLowerCase().replace(/[^a-z]/g, '')}`}>
            {report.prediction}
          </span>
        </div>
      )}

        {report.imagePath && (
          <div className="image-section">
            <strong>Submitted Image:</strong>
            <img
                src={`${BASE_URL}/${report.imagePath}`}
                alt="Report Visual"
                className="report-img"
              />
          </div>
        )}

        {report.audioPath && (
            <div className="audio-section">
              <strong>Submitted Audio:</strong>
              <audio controls className="report-audio">
                <source src={`${BASE_URL}/${report.audioPath}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

        <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} style={{ marginRight: "6px" }} />
        Back
      </button>
      </div>
    </div>
  );
};

export default ReportDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "../styles/Styles/complaintD.css";

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const token = await user.getIdToken();
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/complaints/${complaintId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComplaint(res.data);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      }
    };

    if (complaintId) {
      fetchComplaint();
    }
  }, [complaintId, navigate]);

  if (!complaint) return <div>Loading...</div>;

  return (
    <div className="complaint-wrapper">
      <div className="complaint-card">
        <div className="complaint-content">
          <h2 className="section-title">🌿 Complaint Details</h2>
          <div className="detail-pair"><span>Name:</span> {complaint.name}</div>
          <div className="detail-pair"><span>Email:</span> {complaint.email}</div>
          <div className="detail-pair"><span>Subject:</span> {complaint.subject}</div>
          <div className="detail-pair"><span>Description:</span> {complaint.description}</div>
          <div className="detail-pair"><span>Date:</span> {new Date(complaint.date).toLocaleString()}</div>
        </div>

        {complaint.image && (
          <div className="image-preview">
            <img src={complaint.image} alt="Complaint" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "../styles/admin.css";

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
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
    <div className="detail-container">
      <h2>Complaint Details</h2>
      <p><strong>Name:</strong> {complaint.name}</p>
      <p><strong>Email:</strong> {complaint.email}</p>
      <p><strong>Subject:</strong> {complaint.subject}</p>
      <p><strong>Description:</strong> {complaint.description}</p>
      <p><strong>Date:</strong> {new Date(complaint.date).toLocaleString()}</p>

      {complaint.image && (
        <div>
          <strong>Image:</strong><br />
          <img src={complaint.image} alt="Complaint" className="preview-img" />
        </div>
      )}
    </div>
  );
};

export default ComplaintDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "../styles/admin.css";

const FeedbackDetail = () => {
  const { feedbackId } = useParams(); // feedbackId
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const token = await user.getIdToken();
      
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/feedback/${feedbackId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedback(res.data);
        

      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      }
    };

    if (feedbackId) {
      fetchFeedback();
    }
  }, [feedbackId, navigate]);

  if (!feedback) return <div>Assuming No Data Present</div>;

  return (
    <div className="detail-container">
      <h2>Feedback Details</h2>
      <p><strong>Feedback ID:</strong> {feedback.feedbackId}</p>
      {feedback.name && <p><strong>Name:</strong> {feedback.name}</p>}
      {feedback.email && <p><strong>Email:</strong> {feedback.email}</p>}
      <p><strong>Rating:</strong> {feedback.rating}</p>
      <p><strong>Message:</strong> {feedback.message}</p>
      <p><strong>Date:</strong> {new Date(feedback.date).toLocaleString()}</p>
      {feedback.beforeImage && (
        <div>
          <strong>Before Image:</strong><br />
          <img src={feedback.beforeImage} alt="Before" className="preview-img" />
        </div>
      )}
      {feedback.afterImage && (
        <div>
          <strong>After Image:</strong><br />
          <img src={feedback.afterImage} alt="After" className="preview-img" />
        </div>
      )}
    </div>
  );
};

export default FeedbackDetail;

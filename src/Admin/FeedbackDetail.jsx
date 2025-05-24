import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "../styles/Styles/feedbackD.css";

const FeedbackDetail = () => {
  const { feedbackId } = useParams();
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  if (!feedback) return <div>Loading...</div>;

  const renderStars = (count) => {
    return "⭐️".repeat(count || 0);
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <h2 className="section-title">🌿 Feedback Summary</h2>
        <div className="feedback-info">
          {feedback.name && <p><strong>Name:</strong> {feedback.name}</p>}
          {feedback.email && <p><strong>Email:</strong> {feedback.email}</p>}
          <p><strong>Rating:</strong> <span className="stars">{renderStars(feedback.rating)}</span></p>
          <p><strong>Message:</strong> {feedback.message}</p>
          <p><strong>Date:</strong> {new Date(feedback.date).toLocaleString()}</p>
        </div>

        <div className="image-gallery">
          {feedback.beforeImage && (
            <details className="image-block">
              <summary>Before Image</summary>
              <img src={feedback.beforeImage} alt="Before" />
            </details>
          )}
          {feedback.afterImage && (
            <details className="image-block">
              <summary>After Image</summary>
              <img src={feedback.afterImage} alt="After" />
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Feedback.css';
import { FaStar } from 'react-icons/fa'; // ⭐ You'll need react-icons

const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState('');
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const handleBeforeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) convertToBase64(file, setBeforeImage);
  };

  const handleAfterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) convertToBase64(file, setAfterImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      name: user?.displayName,
      email: user?.email,
      rating,
      message,
      date: new Date().toISOString(),
      beforeImage,
      afterImage,
    };

    try {
      const response = await fetch('/api/feedbacks/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {submitted ? (
        <p className="success-msg">✅ Thank you for your feedback!</p>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>
            Rating:
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                      required
                    />
                    <FaStar
                      className="star"
                      color={
                        currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'
                      }
                      size={28}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </label>

          <label>
            Your Feedback:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>

          <label>
            Before Image:
            <input type="file" accept="image/*" onChange={handleBeforeImageChange} />
          </label>

          <label>
            After Image:
            <input type="file" accept="image/*" onChange={handleAfterImageChange} />
          </label>

          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default Feedback;

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Feedback.css';

const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Convert file to Base64
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
      name: user?.displayName || 'Anonymous',
      email: user?.email || 'Guest',
      rating,
      message,
      date: new Date().toISOString(),
      beforeImage,
      afterImage,
    };

    console.log("Submitting Feedback:", feedbackData);

    // TODO: Send this to your backend API
    setSubmitted(true);
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {submitted ? (
        <p className="success-msg">✅ Thank you for your feedback!</p>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>
            Rating (1 to 5):<br />
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>

          <label>
            Your Feedback:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label><br></br>

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

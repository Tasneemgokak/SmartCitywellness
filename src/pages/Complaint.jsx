import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../styles/Complaint.css';

const Complaint = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('You must be logged in to submit a complaint.');
      return;
    }

    const complaintData = {
      name: currentUser.displayName || 'Anonymous',
      email: currentUser.email,
      subject,
      description
    };

    try {
      const response = await fetch('http://localhost:5000/api/complaints/complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(complaintData)
      });

      const data = await response.json();

      if (response.ok) {
        // alert(`Complaint submitted! ID: ${data.complaintId}`);
        setSubmitted(true);
        setSubject('');
        setDescription('');
      } else {
        alert(`Error: ${data.error}`);
      }

    } catch (error) {
      console.error('Submission failed:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Complaint Form</h2>
      {submitted ? (
        <p className="success-msg">Thank you for your complaint!</p>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={currentUser?.displayName || ''}
            readOnly
          />

          <label>Email:</label>
          <input
            className="complaint-input"
            type="email"
            value={currentUser?.email || ''}
            readOnly
          />

          <label>Subject:</label>
          <input
           className='Subject-input'
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Submit Complaint</button>
        </form>
      )}
    </div>
  );
};

export default Complaint;
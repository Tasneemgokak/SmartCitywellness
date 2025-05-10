import React, { useState } from 'react';
import '../styles/complaint.css';


const Complaint = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint Submitted Successfully!");
  };

  return (
    <div className="feedback-container">
      <h2>Complaint Form</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>Subject:</label>
        <input
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
    </div>
  );
};

export default Complaint;

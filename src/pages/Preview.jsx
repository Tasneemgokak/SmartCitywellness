import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/PreviewIssue.css'; 


const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [data] = useState(() => {
    const state = location.state;
    if (state) {
      localStorage.setItem("previewData", JSON.stringify(state));
      return state;
    }
    const saved = localStorage.getItem("previewData");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!data) {
      // If no state or saved data, redirect
      navigate("/report");
    }
  }, [data, navigate]);

  
  const { issue, image, prediction, user } = data;
   const getSeverityLevel = (predictedClass) => {
    if (["plastic", 
      "ewaste", 
      "trash", 
      "biological",
      "Organic"].includes(predictedClass)) return "High";
    if (["shoes",
       "clothes",
       "green-glass",
       "white-glass",
       "brown-glass",
       "metal"].includes(predictedClass)) return "Medium";
    return "Low";
  };
  const severity = getSeverityLevel(prediction);

if (!data) return <p>Loading...</p>;
  

  return (
    <div className="preview-container">
      <h2>📋 Preview Report</h2>
      
      <div className="preview-section">
        <strong>👤 Reported by:</strong>
        <p>{user}</p>
      </div>

      <div className="preview-section">
        <strong>📝 Description:</strong>
        <p>{issue}</p>
      </div>

      <div className="preview-section">
        <strong>🖼️ Uploaded Image:</strong>
        {image && <img src={image} alt="Uploaded content" className="preview-image" />}
      </div>

      <div className="preview-section">
        <strong>🔍 Predicted Waste Class:</strong>
        <p className="prediction">{prediction}</p>
      </div>

      <div className="preview-section">
        <strong>🚨 Severity Level:</strong>
        <p className={`severity ${severity.toLowerCase()}`}>{severity} Level</p>
      </div>


      <button className="btn" onClick={() => navigate('/')}>Report Another Issue</button>
    </div>
  );
};

export default Preview;

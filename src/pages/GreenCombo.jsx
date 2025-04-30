import React from 'react';
import { useNavigate } from 'react-router-dom';

const GreenCombo = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#00ff84' }}>Green Combo Page</h1>
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: '#ff0033',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default GreenCombo;
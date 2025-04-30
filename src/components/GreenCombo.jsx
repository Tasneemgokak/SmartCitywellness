import React from 'react';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const GreenCombo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Green Combo Page</h1>
      {user && <p>Welcome, {user.email}</p>}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">This is your Green Combo content</h2>
        <p>Add your specific content here...</p>
      </div>

      <button 
        onClick={handleGoBack}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default GreenCombo;
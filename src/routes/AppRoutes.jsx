import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminDashboard from "../pages/Dashboard";
import ReportIssue from "../pages/ReportIssue";
import History from "../pages/History";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Feedback from "../pages/Feedback";
import Complaint from "../pages/Complaint";
import Home from "../pages/Home";
import Preview from '../pages/Preview';
import ResetPassword from "../pages/ResetPassword";


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/home" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/report" element={<PrivateRoute><ReportIssue /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
      <Route path="/complaint" element={<PrivateRoute><Complaint /></PrivateRoute>} />
      <Route path="/preview" element={<PrivateRoute><Preview /></PrivateRoute>} />
     <Route path="/resetpassword" element={<ResetPassword />} />
      
      

    </Routes>
  );
};

export default AppRoutes;
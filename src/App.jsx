import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import ReportIssue from "./pages/ReportIssue";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import Complaint from "./pages/Complaint";
<<<<<<< HEAD
import ResetPassword from "./pages/ResetPassword";
import Preview from "./pages/Preview";
=======
import Preview from './pages/Preview'; 
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from './Admin/AdminDashboard';
import FeedbackDetail from './Admin/FeedbackDetail';
import ReportDetail from './Admin/ReportDetail';
import ComplaintDetail from './Admin/ComplaintDetail';
>>>>>>> origin/MD2

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const AdminPrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(null);

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (!currentUser) {
        setIsAdmin(false);
        return;
      }
      try {
        const tokenResult = await currentUser.getIdTokenResult();
        setIsAdmin(!!tokenResult.claims.admin);
      } catch (err) {
        console.error("Token error:", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [currentUser]);

  if (isAdmin === null) return <div>Checking permissions...</div>;

  return isAdmin ? children : <Navigate to="/admin-login" />;
};


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      
                                      {/* Protected Routes */}

      {/* Public Routes */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/report" element={<PrivateRoute><ReportIssue /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
      <Route path="/complaint" element={<PrivateRoute><Complaint /></PrivateRoute>} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/preview" element={<PrivateRoute><Preview /></PrivateRoute>} />
      
      
                                      {/* Admin Protected Routes */}

      {/* <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /> 
      <Route path="/admin/feedback/:feedbackId" element={<PrivateRoute><FeedbackDetail /></PrivateRoute>} />
      <Route path="/admin/reports/:reportId" element={<PrivateRoute><ReportDetail /></PrivateRoute>} />
      <Route path="/admin/complaints/:complaintId" element={<PrivateRoute><ComplaintDetail /></PrivateRoute>} /> */}

      <Route path="/admin-dashboard" element={ <AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute> } />
      <Route path="/admin/feedback/:feedbackId" element={<AdminPrivateRoute><FeedbackDetail /></AdminPrivateRoute>} />
      <Route path="/admin/reports/:reportId" element={ <AdminPrivateRoute><ReportDetail /></AdminPrivateRoute> } />
      <Route path="/admin/complaints/:complaintId" element={ <AdminPrivateRoute><ComplaintDetail /></AdminPrivateRoute> } />

      {/* Redirect to login if no match */}
    </Routes>
  );
};

export default AppRoutes;
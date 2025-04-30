import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import Dashboard from '../pages/Dashboard';
import ReportIssue from '../pages/ReportIssue';
import History from '../pages/History';
import GreenCombo from '../pages/GreenCombo';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* All protected routes */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/history" element={<History />} />
          <Route path="/green-combo" element={<GreenCombo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
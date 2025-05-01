import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> { /* This renders nested routes like /report */ }
      </div>
    </div>
  );
};

export default SidebarLayout;
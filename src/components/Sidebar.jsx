import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaHistory, FaBug, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Sidebar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLinkClick = (path) => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
    navigate(path);
  };

  return (
    <div className="main-container">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>

        {isOpen && (
          <>
            <div className="sidebar-header">
              <FaUserCircle size={40} />
              <h3>{user ? user.displayName || user.email : "Guest"}</h3>
            </div>

            <nav className="sidebar-nav">
              <ul>
                <li>
                  <div onClick={() => handleLinkClick('/dashboard')} className="nav-link">
                    <FaTachometerAlt className="nav-icon" />
                    <span>Dashboard</span>
                  </div>
                </li>
                <li>
                  <div onClick={() => handleLinkClick('/report')} className="nav-link">
                    <FaBug className="nav-icon" />
                    <span>Report Issue</span>
                  </div>
                </li>
                <li>
                  <div onClick={() => handleLinkClick('/history')} className="nav-link">
                    <FaHistory className="nav-icon" />
                    <span>History</span>
                  </div>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Optional, for styling

const Sidebar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed from the parent component
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="sidebar">
      <h2>Student Dashboard</h2>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/assignment">Assignments</Link></li>
        <li><Link to="/grades">Grades</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
      </ul>
      <div className="auth-buttons">
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            <img src="/images/profile.png" alt="Logout" className="icon" /> Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

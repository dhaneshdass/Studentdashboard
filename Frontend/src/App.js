import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Sidebar from './components/sidebar';
import Header from './components/header';
import StudentProfile from './components/StudentProfile';
import AttendancePage from './components/Attendance';
import Assignment from './components/assignment/assignment.js';
import Signup from './signup.jsx';
import Login from './login.jsx';
import GradesDashboard from './components/Grades/GradesDashboard.js';
import PrivateRoute from './components/privateroute.jsx';  // Import the PrivateRoute component
import './App.css';
import Calendar from './components/Calendar/Calendar.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
    localStorage.setItem('isLoggedIn', loginStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <div className="page-content">
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />

              {/* Private routes */}
              <Route 
                path="/" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/student-profile" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <StudentProfile />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/attendance" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <AttendancePage />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/assignment" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Assignment />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/grades" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <GradesDashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/Calendar" 
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Calendar />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Attendance.css';

const Attendance = () => {
  const [subject, setSubject] = useState('');
  const [totalClasses, setTotalClasses] = useState('');
  const [attended, setAttended] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [editing, setEditing] = useState(false); // Track if we are editing a record
  const [currentId, setCurrentId] = useState(''); // Store the id of the record being edited

  // Get all attendance records
  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/attendance');
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Handle form submission to add/update attendance
  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !totalClasses || !attended) {
      alert('All fields are required');
      return;
    }

    try {
      const data = { subject, totalClasses, attended };

      if (editing) {
        // Update existing attendance record
        await axios.put(`http://localhost:5000/attendance/${currentId}`, data);
        setEditing(false); // Reset editing state
      } else {
        // Add new attendance record
        await axios.post('http://localhost:5000/attendance', data);
      }

      fetchAttendance(); // Refresh the attendance list
      setSubject('');
      setTotalClasses('');
      setAttended('');
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  // Delete attendance record by subject
  const handleDeleteAttendance = async (subject) => {
    try {
      await axios.delete(`http://localhost:5000/attendance/${subject}`);
      fetchAttendance(); // Refresh the attendance list
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  // Set form data for editing
  const handleEditAttendance = (attendance) => {
    setSubject(attendance.subject);
    setTotalClasses(attendance.totalClasses);
    setAttended(attendance.attended);
    setEditing(true); // Set editing mode to true
    setCurrentId(attendance._id); // Store the id of the record being edited
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditing(false);
    setSubject('');
    setTotalClasses('');
    setAttended('');
  };

  useEffect(() => {
    fetchAttendance(); // Fetch attendance records on component mount
  }, []);

  return (
    <div>
      {/* Attendance Form */}
      <form
        onSubmit={handleAttendanceSubmit}
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          margin: "20px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Subject:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Total Classes:
          </label>
          <input
            type="number"
            value={totalClasses}
            onChange={(e) => setTotalClasses(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Classes Attended:
          </label>
          <input
            type="number"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          {editing ? 'Update Attendance' : 'Add Attendance'}
        </button>
        
        {/* Conditional Cancel Button */}
        {editing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{
              marginLeft: "2px",
              padding: "12px 20px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Attendance Records List */}
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance.subject}</td>
              <td>{attendance.totalClasses}</td>
              <td>{attendance.attended}</td>
              <td>
                <button onClick={() => handleEditAttendance(attendance)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteAttendance(attendance.subject)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;

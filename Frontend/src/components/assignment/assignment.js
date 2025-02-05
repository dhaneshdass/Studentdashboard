import React from 'react';
import './assignment.css';
import ProgressBar from './LinearProgressWithLabel'
import TasksSection from './TaskSection';

const Assignment = () => {

  // assignment box

  const assignmentData = [
    {
      title: 'English',
      description: 'Question & Answer',
      imgSrc: 'https://thumbs.dreamstime.com/b/english-subject-icon-isolated-white-background-english-subject-icon-isolated-white-background-your-web-mobile-app-133861444.jpg', // Replace with actual image URL
      status: null,
      progress: 35, // No progress bar for this one
    },
    {
      title: 'Tamil',
      description: 'கட்டுரை மற்றும் கவிதை',
      imgSrc: 'https://thumbs.dreamstime.com/b/tamil-icon-language-254002914.jpg', // Replace with actual image URL
      status: null, // No "New" badge for this one
      progress: 35, // Progress in percentage
    },
    {
      title: 'Mathematics',
      description: 'Sums & Theorems',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb6vM4jvoRajz4NBkA5xsMSPIHcp2JMI2z2A&s', // Replace with actual image URL
      status: null,
      progress: 80,
    },
    {
      title: 'Science',
      description: 'Theory & practical',
      imgSrc: 'https://img.freepik.com/free-vector/colorful-science-objects-icons-vector-set_1308-133256.jpg', // Replace with actual image URL
      status: null,
      progress: 60,
    },
    {
      title: 'Social',
      description: 'Essays & discussions',
      imgSrc: 'https://classroomcompletepress.com/cdn/shop/collections/Collection_Image_Blank_ff155279-b272-4bb4-bebc-94f756d3d5ee_1024x.jpg?v=1596561631', // Replace with actual image URL
      status: null,
      progress: 50,
    }
    
  ];
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      {/* <div >
      <ContentHeader/>
      </div> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Left Section */}
        <div className="left-section">
            <div className="profile-card">
            <div className="profile-content">
                <center><p>
                <span>Hi</span>, You have completed <strong>70%</strong> of your weekly
                  targets. Keep learning with us like this.
                </p></center>
                <button className="set-goals-btn">Set Goals</button>
              </div>
          </div>


          <div className="assignments-section">
          <div className="assignments-header">
        <h2>Your Assignments</h2> 
      </div>
      <div className="assignments-list">
        {assignmentData.map((assignment, index) => (
          <div className="assignment-card" key={index}>
            <div className="assignment-header">
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
            </div>
            <div className="assignment-body">
              <img src={assignment.imgSrc} alt={assignment.title} />
              {assignment.status && <span className="status-badge">{assignment.status}</span>}
              {assignment.date && <p className="date">{assignment.date}</p>}
              {assignment.progress !== null && (
                // 
                <ProgressBar progress={assignment.progress} />
              )}
            </div>
          </div>
        ))}
      </div>
          </div>

          <div className="activities-section">
            <h2>Activities</h2>
            
            <ul>
              <li>
                <strong>Sara Joseph</strong> shared two new assignment feedback
                for <strong>Class 4B</strong>
              </li>
              <li>
                <strong>Joseph</strong> shared class Project Koala Bear{' '}
                <strong>Class 4B</strong>
              
              </li>
              <li>
                <strong>Mabel</strong> checked in to your assignment{' '}
                <strong>Monuments V1.0</strong>
              
              </li>
            </ul>
          </div>
        </div>

          <TasksSection />
        </div>
      </div>
  );
};

export default Assignment;

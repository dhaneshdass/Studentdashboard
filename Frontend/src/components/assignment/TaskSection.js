import React, { useState } from 'react';
// import './Tasks.css'; 

export default function TasksSection() {
  const [tasks, setTasks] = useState([
    { id: 1, type: 'upload', name: 'Upload Assignment', time: '8:00 am' },
    { id: 2, type: 'study', name: 'Study for Quiz', time: '10:00 am' },
    { id: 3, type: 'paragraph', name: 'Paragraph Corrections', time: '12:00 am' },
    { id: 4, type: 'spell-check', name: 'Spell Check English', time: '1:00 pm' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    type: '',
    name: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.name && newTask.type && newTask.time) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), ...newTask },
      ]);
      setNewTask({ type: '', name: '', time: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="tasks-section">
      <h3>Your Tasks Today</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className='task-color'></span>
            {task.name} <span className="time"><span>:</span> {task.time}</span>
          </li>
        ))}
      </ul>
      <button
        className="create-task-btn"
        onClick={() => setShowForm((prev) => !prev)}
      >
        + Create New
      </button>

      {showForm && (
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={newTask.name}
            onChange={handleInputChange}
            required
          />
          <select
            name="type"
            value={newTask.type}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Task Type
            </option>
            <option value="upload">Upload</option>
            <option value="study">Study</option>
            <option value="paragraph">Paragraph</option>
            <option value="spell-check">Spell Check</option>
          </select>
          <input
            type="time"
            name="time"
            value={newTask.time}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="create-task-btn">
            Add Task
          </button>
        </form>
      )}
    </div>
  );
}

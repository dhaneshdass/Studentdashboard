import React, { useState } from 'react';
import './Calendar.css'; // Custom styles for the small calendar size

const SimpleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { title: 'Math Exam', date: '2025-01-25' },
    { title: 'Science Assignment Due', date: '2025-01-30' },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  const generateCalendar = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfMonth = startOfMonth.getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  };

  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  const hasEvent = (day) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return events.some((event) => event.date === dayDate);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (selectedDate && selectedDate.toISOString().split('T')[0] === clickedDate.toISOString().split('T')[0]) {
      setSelectedDate(null);
    } else {
      setSelectedDate(clickedDate);
      setNewEventTitle('');
    }
  };

  const addEvent = () => {
    if (newEventTitle && selectedDate) {
      const newEvent = {
        title: newEventTitle,
        date: selectedDate.toISOString().split('T')[0], // Store date in ISO format
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setSelectedDate(null); // Hide Add Event box after adding
    }
  };

  const deleteEvent = (eventToDelete) => {
    setEvents(events.filter((event) => event !== eventToDelete));
  };

  const calendarDays = generateCalendar(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="simple-calendar-container">
      <h2>Student Dashboard - Calendar</h2>
      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-day header">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? 'active' : ''} ${hasEvent(day) ? 'event-day' : ''}`}
            onClick={() => day && handleDateClick(day)}
          >
            {day || ''}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="event-modal">
          <h3>Activities for {selectedDate.toLocaleDateString()}</h3>
          <div className="event-list">
            {events
              .filter((event) => event.date === selectedDate.toISOString().split('T')[0])
              .map((event, index) => (
                <div key={index} className="event-item">
                  <span>{event.title}</span>
                  <button onClick={() => deleteEvent(event)}>Delete</button>
                </div>
              ))}
          </div>

          <input
            type="text"
            placeholder="Add new event"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <button onClick={addEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default SimpleCalendar;

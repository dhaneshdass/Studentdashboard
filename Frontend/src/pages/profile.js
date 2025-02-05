import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

const StudentDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    std: '',
    sec: '',
    fatherName: '',
    bloodGroup: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend
      const response = await axios.post('http://localhost:5000/addStudent', formData);
      console.log(response.data);
      alert('Details Added Successfully!');
      setFormData({
        name: '',
        age: '',
        gender: '',
        std: '',
        sec: '',
        fatherName: '',
        bloodGroup: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to add details');
    }
  };

  return (
    <div classname="Profile-page">
    <div className="student-form-container">
      <h2>Student Details Form</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Standard:
          <input
            type="text"
            name="std"
            value={formData.std}
            onChange={handleChange}
            placeholder="Enter your standard"
            required
          />
        </label>
        <label>
          Section:
          <input
            type="text"
            name="sec"
            value={formData.sec}
            onChange={handleChange}
            placeholder="Enter your section"
            required
          />
        </label>
        <label>
          Father's Name:
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Enter father's name"
            required
          />
        </label>
        <label>
          Blood Group:
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="A1B+">A1B+</option>
            <option value="A1B-">A1B-</option>
          </select>
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="3"
            required
          ></textarea>
        </label>
        <button type="submit" className="submit-btn">
          Add Details
        </button>
      </form>
    </div>
    </div>
  );
};

export default StudentDetailsForm;

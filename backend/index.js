import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());  // To parse JSON request bodies
app.use(cors());  // To handle cross-origin requests

// Ensure environment variables are loaded correctly
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing required environment variables: MONGO_URI or JWT_SECRET");
  process.exit(1);  // Exit the application if required env variables are missing
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
  dbName: 'attendanceDB',  // Specify the correct database name
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

// Create the user model for 'users' collection
const User = mongoose.model('User', userSchema, 'users');

// Attendance schema
const attendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  totalClasses: { type: Number, required: true, min: 0 },
  attended: { type: Number, required: true, min: 0 }
});

// Create the attendance model for 'attendances' collection
const Attendance = mongoose.model('Attendance', attendanceSchema, 'attendances');

// Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  std: { type: String, required: true },
  sec: { type: String, required: true },
  fatherName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});

// Create the student model for 'students' collection
const Student = mongoose.model('Student', studentSchema, 'students');

// Validate email format function
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during user registration' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      expiresIn: process.env.JWT_EXPIRATION || '1h',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Route to get all attendance records
app.get('/attendance', async (req, res) => {
  try {
    const attendanceData = await Attendance.find();
    res.json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add or update attendance
app.post('/attendance', async (req, res) => {
  const { subject, totalClasses, attended } = req.body;

  if (!subject || !totalClasses || !attended) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    let attendance = await Attendance.findOne({ subject });

    if (attendance) {
      attendance.totalClasses = totalClasses;
      attendance.attended = attended;
      await attendance.save();
      res.status(200).json({ success: true, message: 'Attendance updated successfully' });
    } else {
      attendance = new Attendance({ subject, totalClasses, attended });
      await attendance.save();
      res.status(201).json({ success: true, message: 'Attendance created successfully' });
    }
  } catch (error) {
    console.error('Error adding/updating attendance:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to delete attendance by subject
app.delete('/attendance/:subject', async (req, res) => {
  const { subject } = req.params;
  try {
    await Attendance.deleteOne({ subject });
    res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to add student details
app.post('/addStudent', async (req, res) => {
  const { name, age, gender, std, sec, fatherName, bloodGroup, email, phone, address } = req.body;

  if (!name || !age || !gender || !std || !sec || !fatherName || !bloodGroup || !email || !phone || !address) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student already exists' });
    }

    const newStudent = new Student({ name, age, gender, std, sec, fatherName, bloodGroup, email, phone, address });
    await newStudent.save();

    res.status(201).json({ success: true, message: 'Student details added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, message: 'Server error during student details addition' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

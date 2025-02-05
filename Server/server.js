const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const userRouter=require('./Routes/User')

// Import models
require('./Models/DB');
const User = require('./Models/UserSchema');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(userRouter);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insuranceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Insurance Schema
const InsuranceSchema = new mongoose.Schema({
  CurrentDate: { type: Date, default: Date.now },
  name: String,
  policyNumber: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  phone: String,
  email: { type: String, unique: true },
  driverName: String,
  driverGender: String,
  driverAge: Number,
  driverDob: Date,
  driverRelation: String,
  driverOccupation: String,
  driverAddress: String,
  driverCity: String,
  driverState: String,
  driverPincode: String,
  driverPhone: String,
  driverEmail: String
});

const Insurance = mongoose.model('Insurance', InsuranceSchema);

// ===================== User Authentication Routes ===================== //

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, startDate, endDate, address, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      startDate,
      endDate,
      address,
      phoneNumber
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Get all registered users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Forgot Password (Reset)
app.post('/forgot-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });

  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user list
app.get('/home', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ===================== Insurance Policy Routes ===================== //

// Create a new insurance policy
app.post('/Dashboard', async (req, res) => {
  try {
    const {
      name,
      policyNumber,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      driverName,
      driverGender,
      driverAge,
      driverDob,
      driverRelation,
      driverOccupation,
      driverAddress,
      driverCity,
      driverState,
      driverPincode,
      driverPhone,
      driverEmail
    } = req.body;

    // Ensure a policy isn't duplicated by checking email + policy number
    const existingPolicy = await Insurance.findOne({ email, policyNumber });
    if (existingPolicy) {
      return res.status(400).json({ message: 'Policy already exists for this user.' });
    }

    const newInsurance = new Insurance({
      name,
      policyNumber,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      driverName,
      driverGender,
      driverAge,
      driverDob,
      driverRelation,
      driverOccupation,
      driverAddress,
      driverCity,
      driverState,
      driverPincode,
      driverPhone,
      driverEmail
    });

    await newInsurance.save();
    res.status(201).json({ message: 'Insurance policy created successfully.' });

  } catch (error) {
    console.error('Error saving policy:', error);
    res.status(500).json({ message: 'Error saving policy', error });
  }
});

// Get all insurance policies
app.get('/Dashboard', async (req, res) => {
  try {
    const insurances = await Insurance.find({});
    res.status(200).json(insurances);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ error: 'Failed to fetch policies' });
  }
});

// Delete an insurance policy
app.delete('/Dashboard/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await Insurance.findById(id);

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    await Insurance.findByIdAndDelete(id);
    res.status(200).json({ message: "Insurance policy deleted successfully" });

  } catch (error) {
    console.error('Error deleting insurance policy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===================== Start Server ===================== //
const IPaddress = "192.168.99.141";
app.listen(PORT, () => {
  console.log(`Server is running on http://${IPaddress}:${PORT}`);
});

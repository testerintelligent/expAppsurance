
// const route =require( './routes/userRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); 

require('dotenv').config();
require('./Models/DB');
const userRouter=require('./Routes/User')
const User=require('./Models/UserSchema')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(userRouter);


  const InsuranceSchema = new mongoose.Schema({
    CurrentDate: { type: Date, default: Date.now },
    Name: String,
    email: { type: String, unique: true },
    Address: String,
    DateOfBirth: Date,
    PolicyType: [],
    SumInsured: Number,
    Premium: Number,
    Gender:String
  });
  
  const Insurance = mongoose.model('Insurance', InsuranceSchema);
  
  app.post('/Dashboard', async (req, res) => {
    try {
      const { CurrentDate,Name, email, Address, DateOfBirth, PolicyType, SumInsured, Premium ,Gender} = req.body;
      const existingPolicy = await Insurance.findOne({ email });
      if (existingPolicy) {
        return res.status(400).json({ message: 'User already exists. Cannot create a new policy.' });
      }
      const newInsurance = new Insurance({
        CurrentDate,
        Name,
        email,
        Address,
        DateOfBirth,
        PolicyType,
        SumInsured,
        Premium,
        Gender
      });
  
      const savedInsurance = await newInsurance.save();
      res.status(201).json({ message: 'Insurance policy created successfully.' });
    } catch (error) {
      console.error('Error saving policy to MongoDB:', error);
      res.status(500).json({ message: 'Insurance policy creation faced an error', error });
    }
  });
  
  
  app.get('/Dashboard', async (req, res) => {
    try {
      const insurances = await Insurance.find({});
      res.status(200).json(insurances);
    } catch (error) {
      console.error('Error fetching insurances:', error);
      res.status(500).json({ error: 'Failed to fetch insurances' });
    }
  });
  app.delete('/Dashboard/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Insurance.findById(id);
      if (!result) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      await Insurance.findByIdAndDelete(id);
      res.status(200).json({ message: "Insurance deleted successfully" });
    } catch (error) {
      console.error('Error deleting Insurance:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {  
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
      console.error('Error resetting password:', err);
      res.status(500).json({ message: 'Server error' });
    }
});
 app.get('/home', async (req, res) => { 
  try {
    const users = await User.find({}); 
    res.status(200).json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
  app.post('/register', async (req, res) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      });
      const savedUser=await newUser.save();
    res.status(201).json({user: savedUser });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error);
    res.status(500).json({ message: 'Error registered user', error });
  }
  });
  app.get('/register',async(req,res)=>{
    try {
      const users = await User.find({}); 
      res.status(200).json(users); 
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' }); 
    }
  })
  
  
const IPaddress="192.168.99.141";
app.listen(PORT,IPaddress, () => {
    console.log(`Server is running on http://192.168.99.141:${PORT}`);
});



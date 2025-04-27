const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();
require('./Models/DB');

const userRouter=require('./Routes/ValidUserRoutes')
const ContactRouter=require('./Routes/ContactRoutes')
const PolicyRouter=require('./Routes/PolicyRoutes')
const User=require('./Models/ValidUserDetails')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

console.log("Routers are called...");
app.use(userRouter);
app.use(ContactRouter);
app.use(PolicyRouter);



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
      console.log(savedInsurance);
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
  app.put('/Dashboard/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Insurance.findById(id);
      if (!result) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      await Insurance.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Insurance Update successfully" });
    } catch (error) {
      console.error('Error deleting Insurance:', error);
      res.status(500).json({ error: 'Internal server error' });
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



  
  
const IPaddress=process.env.IPaddress;
app.listen(PORT,() => {
    console.log(`Server is running on ${IPaddress}:${PORT}`);
});



// const route =require( './routes/userRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const mongoURI = 'mongodb://192.168.99.141:27017/registeredUser?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0'; // Replace 'mydatabase' with your database name

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
    startDate: Date,
    endDate: Date,
    address: String,
    phoneNumber: String,
  });
  const User = mongoose.model('users', userSchema);

  const InsuranceSchema = new mongoose.Schema({
    CurrentDate: { type: Date, default: Date.now },
    Name: String,
    email: { type: String, unique: true },
    Address: String,
    DateOfBirth: Date,
    PolicyType: String,
    SumInsured: Number,
    Premium: Number,
  });
  
  const Insurance = mongoose.model('Insurance', InsuranceSchema);
  
  app.post('/Dashboard', async (req, res) => {
    try {
      const { CurrentDate,Name, email, Address, DateOfBirth, PolicyType, SumInsured, Premium } = req.body;
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

  app.delete('/:id',async (req,res)=>{
    try {
      const { id } = req.params;
      const result = await User.find({_id:id});
      console.log(result);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
    await User.findByIdAndDelete(id)
      res.status(201).json({message:"User deleted success "})
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
 
  app.delete('/:email',async (req,res)=>{
    try {
      const { email } = req.params;
      console.log("deleting email"+email);
      const result = await User.findOneAndDelete({ email });

      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
app.post('/home',async (req,res) =>{
  const{username,password}=req.body;
  const user=await User.findOne({ email:username, password:password })
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: `Invalid email or password ${username} ${password}` });
  }
  else{
    return res.status(200).json({ message: 'valid email or password' });
  }
})
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
  
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



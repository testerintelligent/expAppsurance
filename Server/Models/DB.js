const mongoose = require('mongoose');
const DatabaseIP=process.env.IPaddress;
const mongoURI = `mongodb://192.168.99.141:27017/registeredUser?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0`; // Replace 'mydatabase' with your database name

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
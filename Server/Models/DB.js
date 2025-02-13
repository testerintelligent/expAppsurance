const mongoose = require('mongoose');
const DatabaseIP=process.env.IPaddress;
const mongoURI = "mongodb://10.192.190.148:27017/registeredUser?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0"

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
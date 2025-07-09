const mongoose = require('mongoose');
const DB_name=process.env.DatabaseName;
const mongoURI = `mongodb://10.192.190.158:27017/${DB_name}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0`

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
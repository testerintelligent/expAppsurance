const mongoose = require('mongoose');
const DB_name=process.env.DatabaseName;
const mongoURI = `mongodb://localhost:27017/${DB_name}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0`

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


/*const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const DB_name = process.env.DatabaseName;
    const mongoURI = `mongodb://127.0.0.1:27017/${DB_name}`;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;   // ✅ export function

*/
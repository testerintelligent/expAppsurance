const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
  });


module.exports= mongoose.model('users', userSchema);
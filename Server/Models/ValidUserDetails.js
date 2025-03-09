const mongoose=require('mongoose');

const loginUserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
  });


module.exports= mongoose.model('validuserdetails', loginUserSchema);
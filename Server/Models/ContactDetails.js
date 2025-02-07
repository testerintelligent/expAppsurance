const mongoose=require('mongoose');

const contactSchema = new mongoose.Schema({
   fullName:String,
   PolicyNumber:String,
   Address:String,
   City:String,
   State:String,
   Pincode:String,
   PhoneNumber:String,
   EmailId:{ type: String, unique: true },
   DriverName:String,
   DriverGender:String,
   DriverAge:String,
   Date:String,
   DriverRelation:String,
   DriverOccupation:String
  });


module.exports= mongoose.model('contact', contactSchema);
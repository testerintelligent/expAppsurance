const Contact=require('../Models/ContactDetails');

exports.EnterContactDetails=async (req,res) =>{
    const{fullName,PolicyNumber,Address,City,State,Pincode,PhoneNumber,EmailId,DriverName,DriverGender,DriverAge,Date,DriverRelation,DriverOccupation}=req.body;
    const ContactDetails=await Contact.findOne({  name:fullName,
        PolicyNumber:PolicyNumber,
        Address:Address,
        City:City,
        State:State,
        Pincode:Pincode,
        PhoneNumber:PhoneNumber,
        EmailId:EmailId,
        DriverName:DriverName,
        DriverGender:DriverGender,
        DriverAge:DriverAge,
        Date:Date,
        DriverRelation:DriverRelation,
        DriverOccupation:DriverOccupation })
    if (!ContactDetails) {
      return res.status(401).json({ message: `Contact details are not completed` });
    }
    else{
      return res.status(200).json({ message: 'valid contact details' });
    }
  }
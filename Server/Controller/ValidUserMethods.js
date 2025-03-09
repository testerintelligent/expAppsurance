const User=require('../Models/ValidUserDetails');


exports.GetRegisterUser=async(req,res)=>{
  try {
      const users = await User.find({}); 
      res.status(200).json(users); 
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
 
}
exports.RegisterNewUser=async(req,res)=>{
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
 
}


//login page API for login
exports.EnterUsernameAndPassword=async (req,res) =>{
    const{username,password}=req.body;
    const ValidUser=await User.findOne({ email:username, password:password })
    console.log(ValidUser);
    if (!ValidUser) {
      return res.status(401).json({ message: `Enter a valid email and password : ${username} & ${password}` });
    }
    else{
      return res.status(200).json({ message: 'valid email or password' });
    }
  }


  //Home page API for delete registered user
  exports.DeleteRegisteredUser=async (req,res)=>{
    try {
      const { email } = req.params;
      console.log("deleting email : "+email);
      const result = await User.findOneAndDelete({ email });

      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      else{
        console.log("User deleted Successfully")
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }  
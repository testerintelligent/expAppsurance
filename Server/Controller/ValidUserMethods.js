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
         email: req.body.email,
         password: req.body.password,
         confirmPassword: req.body.confirmPassword,
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
    const{email,password}=req.body;
    const mail=email;
    console.log(req.body);
    console.log(mail);
    const ValidUser=await User.findOne({ email:mail, password:password })
    console.log(ValidUser);
    if (!ValidUser) {
      return res.status(401).json({ message: `Enter a valid email and password : ${mail} & ${password}` });
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
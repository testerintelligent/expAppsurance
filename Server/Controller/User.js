const User=require('../Models/UserSchema');

//login page API for login
exports.EnterUsernameAndPassword=async (req,res) =>{
    const{username,password}=req.body;
    const user=await User.findOne({ email:username, password:password })
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: `Invalid email or password ${username} ${password}` });
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
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }  
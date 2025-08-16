// import logger from "../utils/logger.js"
const UserDetails=require('../Models/UserModel.js');
const { isValidEmail, encode, isValidPassword, decode, validatePasswordMatch } = require('../utils/utils');
 const logger=require('../utils/logger.js')



 //UserDetails-/getUsers
                                    exports.GetRegisterUser=async(req,res)=>{
                                      // logger.info("User Going to fetch all user")
                                      try {
                                          const users = await UserDetails.find({}); 
                                          //  logger.info("User are all fetched");
                                          res.status(200).json(users); 
                                        } catch (error) {
                                          res.status(500).json({ Message: 'Failed to fetch users' });
                                        } 
                                    }

// UserDetails- /newUser
                                      exports.RegisterNewUser=async(req,res)=>{
                                            try {
                                                
                                                if(isValidEmail(req.body.email) && isValidPassword(req.body.password)){

                                                    const Email=encode(req.body.email);
                                                    const Password=encode(req.body.password)

                                                    const newUser=new UserDetails({
                                                      email:Email,
                                                      password:Password
                                                    })

                                                      const savedUser=await newUser.save();
                                                      // logger.info("User entered an valid email and password")
                                                      res.status(201).json({UserDetails: savedUser });
                                                }
                                                else{
                                                      logger.error("User entered invalid email and password");
                                                      res.status(500).json({message:'Error to create an new user' })
                                                }
                                        } catch (err) {
                                                //  logger.error("Email already in use");
                                                res.status(500).json({message:'Email already in use' })
                                              }
                                      }



// UserDetails-/login                                   
                                  exports.EnterUsernameAndPassword=async (req,res) =>{
                                          
                                              isValidEmail(req.body.email);
                                              const Email=encode(req.body.email)
                                               const Password=encode(req.body.password);

                                              const ValidUser=await UserDetails.findOne({ email:Email,password:Password})

                                              if (!ValidUser) {
                                                return res.status(401).json({ message: `Enter an Invalid email or password by : ${req.body.email} ` });
                                              }
                                              else{
                                                // logger.info("welcome user with valid username and password")
                                                return res.status(200).json({ message: 'logged in...' });
                                              }
                                            }

//UserDetails-/deleteUser/:email

                                          exports.DeleteRegisteredUser=async (req,res)=>{
                                              try {
                                                const {email} = req.params;
                                                const emailParam=encode(email);
                                                const result = await UserDetails.findOneAndDelete({ email:emailParam });

                                                if (!result) {
                                                  return res.status(404).json({ message: 'User not found' });
                                                }
                                                else{
                                                  res.status(200).json({message:'user deleted successfully'})
                                                  // console.log("User deleted Successfully")
                                                }
                                              } catch (error) {
                                                console.error('Error deleting user');
                                                res.status(500).json({Message: 'Error deleting User' });
                                              }
                                            }  

//UserDetails- /forgotPassword
                                    exports.passwordChange=async (req,res) =>{
                                      const Email=encode(req.body.email);
                                      if(validatePasswordMatch(req.body.password,req.body.confirmpassword)){
                                            const Password=encode(req.body.password);
                                            const ValidUser=await UserDetails.updateOne({ email:Email},{$set:{ password:Password }})
                                            if(!ValidUser){
                                                  return res.status(401).json({ message: `Enter a valid email and password : ${req.body.email} & ${req.body.password}` });
                                            }
                                            else{
                                               return res.status(200).json({ message: 'New Password had changed' });
                                            }    
                                      }
                                      else{
                                        console.log("Password got mismatched")
                                      }
                             }




  //////////////////////////////////////////
exports.RegisterNewGmailUser=async(req,res)=>{
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

exports.RegisterNewExpleoUser=async(req,res)=>{
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


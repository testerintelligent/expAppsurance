const express = require('express');

const swaggerUI=require('swagger-ui-express')
const swaggerSpec=require('./swaggerConfig')



const cors = require('cors');
require('dotenv').config();
require('./Models/DB');

const userRouter=require('./Routes/ValidUserRoutes')
const ContactRouter=require('./Routes/ContactRoutes')
const PolicyRouter=require('./Routes/PolicyRoutes')
const User=require('./Models/ValidUserDetails')
const app = express();
const PORT = process.env.PORT || 5000;
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))
app.use(cors());
app.use(express.json());

console.log("Routers are called...");
app.use(userRouter);
app.use(ContactRouter);
app.use(PolicyRouter);




app.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {  
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
      console.error('Error resetting password:', err);
      res.status(500).json({ message: 'Server error' });
    }
});



  
  
const IPaddress=process.env.IPaddress;
app.listen(PORT,() => {
    console.log(`Server is running on ${IPaddress}:${PORT}`);
     console.log('Swagger docs at http://localhost:5000/api-docs');
});



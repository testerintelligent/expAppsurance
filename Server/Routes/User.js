const express=require('express');

const router=express.Router();
const {EnterUsernameAndPassword,DeleteRegisteredUser}=require('../Controller/User')

  //API for login credentials validation
  router.post('/home',EnterUsernameAndPassword);
  //API for delete Registered user
  router.delete('/:email',DeleteRegisteredUser);
  

  // router.delete('/:id',async (req,res)=>{
  //   console.log(req.params);
  //   try {
  //     const { id } = req.params;
  //     const result = await User.find({_id:id});
  //     console.log(result);
  //     if (!result) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //   await User.findByIdAndDelete(id)
  //     res.status(201).json({message:"User deleted success "})
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // })



 


  module.exports=router;
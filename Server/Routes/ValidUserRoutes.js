const express=require('express');

const router=express.Router();
const {EnterUsernameAndPassword,GetUsernameAndPassword,DeleteRegisteredUser,GetRegisterUser, RegisterNewUser}=require('../Controller/ValidUserMethods')

//For register the new user
router.get('/home',GetRegisterUser);
router.post('/register',RegisterNewUser);


  //API for login credentials validation
  router.post('/home',EnterUsernameAndPassword);
  
  //API for delete Registered user
  router.delete('/:email',DeleteRegisteredUser);
  
  module.exports=router;
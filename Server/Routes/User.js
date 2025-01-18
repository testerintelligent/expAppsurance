const express=require('express');

const router=express.Router();
const {EnterUsernameAndPassword,DeleteRegisteredUser}=require('../Controller/User')

  //API for login credentials validation
  router.post('/home',EnterUsernameAndPassword);
  //API for delete Registered user
  router.delete('/:email',DeleteRegisteredUser);
  
  module.exports=router;
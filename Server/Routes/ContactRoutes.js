const express=require('express');

const router=express.Router();
const {EnterContactDetails}=require('../Controller/ContactMethod')

  //API for login credentials validation
  router.post('/putContact',EnterContactDetails);
  
  module.exports=router;
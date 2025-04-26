const express=require('express');

const router=express.Router();
const {enterContactDetails,getContactDetails,filterContactDetails}=require('../Controller/ContactMethod')

  //API for login credentials validation
  router.post('/postContact',enterContactDetails);
  router.get('/getContact',getContactDetails);
  router.post('/filterContact',filterContactDetails);
  module.exports=router;
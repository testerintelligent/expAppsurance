const express=require('express');

const router=express.Router();
const {enterContactDetails,getContactDetails,filterContactDetails, deleteContact,updateContact,getContactById}=require('../Controller/ContactMethod')

  //API for login credentials validation
  router.post('/postContact',enterContactDetails);
  router.get('/getContact',getContactDetails);
  router.post('/filterContact',filterContactDetails);
  router.delete('/deleteContact/:id',deleteContact);
  router.put('/updateContact/:id',updateContact);
  router.get('/view/:id',getContactById);
  module.exports=router;
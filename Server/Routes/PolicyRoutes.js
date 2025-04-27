const express=require('express');

const router=express.Router();
const {enterPolicyDetails,getPolicyDetails}=require('../Controller/PolicyMethods')

  //API for login credentials validation
  router.post('/postPolicy',enterPolicyDetails);
  router.get('/getPolicy',getPolicyDetails);
  //router.post('/filterContact',filterContactDetails);
  module.exports=router;
const express=require('express');

const router=express.Router();
const {enterPolicyDetails,getPolicyDetails,deletePolicyInfo,updatePolicyInfo}=require('../Controller/PolicyMethods')

  //API for login credentials validation
  router.post('/postPolicy',enterPolicyDetails);
  router.get('/getPolicy',getPolicyDetails);
  router.delete('/deletePolicy/:id', deletePolicyInfo);
  router.put('/updatePolicy/:id', updatePolicyInfo);
  //router.post('/filterContact',filterContactDetails);
  module.exports=router;
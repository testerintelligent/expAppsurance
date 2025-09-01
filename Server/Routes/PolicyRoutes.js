const express=require('express');

const router=express.Router();
const {enterPolicyDetails,getPolicyDetails,deletePolicyInfo,updatePolicyInfo,getPolicySummary}=require('../Controller/PolicyMethods')

  //API for login credentials validation
  router.post('/postPolicy',enterPolicyDetails);
  router.get('/getPolicy',getPolicyDetails);
 /**
 * @swagger
 * /api/getPolicySummary:
 *   get:
 *     summary: Get policy summary
 *     description: Returns total number of policies and count by status.
 *     tags: [Policy]
 *     responses:
 *       200:
 *         description: Successfully fetched policy summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPolicies:
 *                   type: integer
 *                   example: 37
 *                 InForce:
 *                   type: integer
 *                   example: 15
 *                 Cancelled:
 *                   type: integer
 *                   example: 2
 *                 UnderReview:
 *                   type: integer
 *                   example: 7
 */
  router.get('/getPolicySummary',getPolicySummary);
  router.delete('/deletePolicy/:id', deletePolicyInfo);
  router.put('/updatePolicy/:id', updatePolicyInfo);
  //router.post('/filterContact',filterContactDetails);
  module.exports=router;
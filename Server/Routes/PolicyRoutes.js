const express=require('express');

const router=express.Router();
const {enterPolicyDetails,getPolicyDetails,deletePolicyInfo,updatePolicyInfo,getPolicySummary}=require('../Controller/PolicyMethods')
const {createAccount,getAccounts,getAccountById,updateAccount,deleteAccount,searchAccounts,linkPolicyToAccount}=require('../Controller/AccountMethod')

  //API for login credentials validation
  router.post('/postPolicy',enterPolicyDetails);
  router.get('/getPolicy',getPolicyDetails);
 /**
 * @swagger
 * /getPolicySummary:
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
  //router.get('/searchAccount', searchAccount); // Removed: handler not defined

/**
 * @swagger
 * /createAccount:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountDetails'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountDetails'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

  router.post("/createAccount", createAccount);
  router.get("/getAccounts", getAccounts);
  router.get("/getAccount/:id", getAccountById);
  router.put("/updateAccount/:id", updateAccount);
  router.delete("/deleteAccount/:id", deleteAccount);

  router.post("/search", searchAccounts);
  router.put("/linkPolicy/:id/:policyId", linkPolicyToAccount);


  module.exports=router;
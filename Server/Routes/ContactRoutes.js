const express=require('express');

const router=express.Router();
const {enterContactDetails,getContactDetails,filterContactDetails, deleteContact,updateContact,getContactById, searchContact}=require('../Controller/ContactMethod')

  //API for login credentials validation

/**
 * @swagger
 * /postContact:
 *   post:
 *     summary: User wants to enter login credentials
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
  router.post('/postContact',enterContactDetails);

 /**
 * @swagger
 * /getContact:
 *   get:
 *     summary: Retrieve contact information
 *     tags:
 *       - Contact
 *     responses:
 *       200:
 *         description: Successful response with contact data
 */
  router.get('/getContact',getContactDetails);
  router.post('/filterContact',filterContactDetails);
  router.delete('/deleteContact/:id',deleteContact);
  router.put('/updateContact/:id',updateContact);
  router.get('/view/:id',getContactById);
  router.get('/contacts/search',searchContact);
  module.exports=router;
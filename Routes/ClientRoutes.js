const express=require('express');

const router=express.Router();
const {enterPersonalClientDetails,getPersonalClients,getaSinglePersonalClient,filterContactDetails, deletePersonalClient,updateContact,getContactById}=require('../Controller/ClientMethods')


/**
 * @swagger
 * /newPersonalClient:
 *   post:
 *     summary: User to create a new Client
 *     tags:
 *       - Client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               Surname:
 *                 type: string
 *               EmailAddress:
 *                 type: string
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *               Gender:
 *                 type: string
 *               MaritalStatus:
 *                 type: boolean
 *               Salutation:
 *                 type: string
 *               InceptionDate:
 *                 type: string
 *                 format: date
 *               Income:
 *                 type: number
 *               LineofBusiness:
 *                 type: string
 *               IDtype:
 *                 type: string
 *               IDNumber:
 *                 type: string
 *               AddressType:
 *                 type: string
 *               PostalCode:
 *                 type: number
 *               BuildingName:
 *                 type: string
 *               StreetName:
 *                 type: string
 *               District:
 *                 type: string
 *               City:
 *                 type: string
 *               Country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client created successfully
 */

  router.post('/newPersonalClient',enterPersonalClientDetails);

 /**
 * @swagger
 * /getPersonalClients:
 *   get:
 *     summary: Retrieve contact information
 *     tags:
 *       - Client
 *     responses:
 *       200:
 *         description: Successful response with contact data
 */
  router.get('/getPersonalClients',getPersonalClients);


  /**
 * @swagger
 * /deleteClient/{ClientNo}:
 *   delete:
 *     summary: Delete Client information
 *     tags:
 *       - Client
  *     parameters:
 *       - in: path
 *         name: ClientNo
 *         required: true
 *         schema:
 *           type: string
 *         description: ClientNo wants to delete
 *     responses:
 *       200:
 *         description: Mentioned Client got deleted
 */

  router.delete('/deleteClient/:ClientNo',deletePersonalClient);

 /**
 * @swagger
 * /view/{ClientNo}:
 *   get:
 *     summary: View Personal Client
 *     tags:
 *       - Client
 *     parameters:
 *       - in: path
 *         name: ClientNo
 *         required: true
 *         schema:
 *           type: string
 *         description: View Single Personal Client by ClientNo
 *     responses:
 *       200:
 *         description: Successfully need to see a single Personal Client
 */

  router.get('/viewPersonalClient/:ClientNo',getaSinglePersonalClient);








// /**
//  * @swagger
//  * /filterContact:
//  *   post:
//  *     summary: Filter contact information
//  *     tags:
//  *       - Client
//  *     responses:
//  *       200:
//  *         description: Successful response with contact data
//  */

//   router.post('/filterContact',filterContactDetails);



// /**
//  * @swagger
//  * /updateContact/{id}:
//  *   post:
//  *     summary: Update contact information
//  *     tags:
//  *       - Client
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the contact to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Successful response with contact data
//  */

//   router.put('/updateContact/:id',updateContact);


  
  module.exports=router;
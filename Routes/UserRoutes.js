const express=require('express');

const router=express.Router();
const {passwordChange,EnterUsernameAndPassword,RegisterNewGmailUser,RegisterNewExpleoUser,DeleteRegisteredUser,GetRegisterUser, RegisterNewUser}=require('../Controller/UserMethods')

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: User wants to get all the registered user
 *     tags:
 *       - Users
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Get list of all user
 */
router.get('/getUsers',GetRegisterUser);


/**
 * @swagger
 * /newUser:
 *   post:
 *     summary: User wants to register new user by email and password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: New user created successfully
 */

router.post('/newUser',RegisterNewUser);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User wants to enter login credentials as username and password
 *     tags:
 *       - Users
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post('/login',EnterUsernameAndPassword);


/**
 * @swagger
 * /deleteUser/{email}:
 *   delete:
 *     summary: User wants to delete the registered user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to delete
 *     responses:
 *       200:
 *         description: User deleted Successfully
 */

  router.delete('/deleteUser/:email',DeleteRegisteredUser);


 /**
 * @swagger
 * /forgotPassword:
 *   put:
 *     summary: User wants to change the password for user
 *     tags:
 *       - Users
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
 *               confirmpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */

router.put('/forgotPassword',passwordChange);


/**
 * @swagger
 * /newGmailUser:
 *   post:
 *     summary: User wants to register new Gmail user by email and password
 *     tags:
 *       - Users
 *     requestBody:
 *           required: true
 *     content:
 *         application/json:
 *         schema:
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
router.post('/newGmailUser',RegisterNewGmailUser);

/**
 * @swagger
 * /newExpleoUser:
 *   post:
 *     summary: User wants to register new Expleo user by email and password
 *     tags:
 *       - Users
 *     requestBody:
 *           required: true
 *     content:
 *         application/json:
 *         schema:
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
router.post('/newExpleoUser',RegisterNewExpleoUser);

  
  module.exports=router;
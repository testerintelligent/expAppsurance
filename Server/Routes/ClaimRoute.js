console.log('ClaimRoute loaded');
const express = require('express');
const router = express.Router();
const createClaim  = require('../Controller/ClaimController');

// The POST method maps to the creation function
router.post('/create', createClaim.createClaim);

module.exports = router;
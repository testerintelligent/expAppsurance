console.log('ClaimRoute loaded');
const express = require('express');
const router = express.Router();
const claimController = require('../Controller/ClaimController');
 
router.post('/create', claimController.createClaim);
 
router.get('/list', claimController.getClaimsList);
 
// GET /api/claims/search/:claimNumber
router.get('/search/:claimNumber', claimController.getClaimByNumber);
 
module.exports = router;
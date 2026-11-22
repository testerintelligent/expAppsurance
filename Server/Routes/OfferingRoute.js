// Routes/OfferingRoute.js
const express = require('express');
const router = express.Router();
const offeringController = require('../Controller/OfferingController');

router.get('/', offeringController.getOfferings);

module.exports = router;

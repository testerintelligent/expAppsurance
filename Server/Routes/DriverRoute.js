const express = require('express');
const router = express.Router();
const driverController = require('../Controller/DriverController');

router.post('/createDriver', driverController.createDriver);
router.get('/submission/:submissionId', driverController.getDriversBySubmission);
router.put('/:driverId', driverController.updateDriver);

module.exports = router;

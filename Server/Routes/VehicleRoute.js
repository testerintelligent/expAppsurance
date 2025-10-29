const express = require('express');
const router = express.Router();
const vehicleController = require('../Controller/VehicleController');

router.post('/createVehicle', vehicleController.createVehicle);
router.get('/submission/:submissionId', vehicleController.getVehiclesBySubmission);
router.put('/:vehicleId', vehicleController.updateVehicle);

module.exports = router;

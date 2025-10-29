// Models/VehicleDetails.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  submissionId: { type: String, required: true, index: true },

  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true, unique: true },
  licensePlate: { type: String, required: true },
  stateRegistered: { type: String, required: true },

  coverages: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VehicleDetails', vehicleSchema);

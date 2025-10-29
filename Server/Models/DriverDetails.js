const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  // Allow string-based submissionId instead of ObjectId
  submissionId: { type: String, required: true, index: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed'],
    required: true,
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  secondaryEmail: { type: String },

  // Address
  country: { type: String, default: 'India' },
  address: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },

  // License / Roles
  licenseType: { type: String, required: true },
  licenseCountry: { type: String, required: true },
  licenseDate: { type: Date, required: true },
  drivingExperience: { type: Number, required: true },
  accidentsClaims: { type: String, required: true },

  // Optional Yes/No fields
  drivingViolations: { type: String, enum: ['yes', 'no'], default: 'no' },
  previousInsurer: { type: String, enum: ['yes', 'no'], default: 'no' },
  mainDriverOtherVehicles: { type: String, enum: ['yes', 'no'], default: 'no' },
  ownOtherVehicles: { type: String, enum: ['yes', 'no'], default: 'no' },
  ownOrInsureVehicles: { type: String, enum: ['yes', 'no'], default: 'no' },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DriverDetails', driverSchema);

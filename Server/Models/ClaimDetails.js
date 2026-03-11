const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema(
  {
    claimNumber: { type: String, unique: true },
    policyNumber: String,
    policyId: {type: mongoose.Schema.Types.ObjectId, ref: 'PolicyDetails', required: true},
    insured: {
      name: String,
      phone: String,
      address: String,
    },
    lossDate: Date,
    dateOfNotice: Date,
    claimType: String,
    howReported: String,
    reportedBy: String,
    relationToInsured: String,
    lossCause: String,
    weather: String,
    faultRating: String,
    incidentOnly: {
      type: Boolean,
      default: false,
    },
    lossDescription: String,
    lossLocation: String,
    policeReported: Boolean,

    vehicles: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'VehicleDetails'}
    ],

    drivers: [
     {type: mongoose.Schema.Types.ObjectId, ref: 'DriverDetails'}
    ],

    status: {
      type: String,
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", ClaimSchema);

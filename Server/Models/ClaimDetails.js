const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema(
  {
    claimNumber: { type: String, unique: true },
    policyNumber: String,
    policyId: String,

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

    lossDescription: String,
    lossLocation: String,
    policeReported: Boolean,

    vehicles: [
      {
        vehicleId: String,
        make: String,
        model: String,
        year: Number,
        licensePlate: String,
      },
    ],

    drivers: [
      {
        driverId: String,
        name: String,
        phone: String,
      },
    ],

    status: {
      type: String,
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", ClaimSchema);

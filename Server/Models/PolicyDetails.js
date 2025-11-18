const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyId: { type: String, unique: true, required: true, default: () => `PID-${Date.now()}` },
  submissionId: { type: String, ref: "SubmissionDetails", required: true },
  quoteId: { type: mongoose.Schema.Types.ObjectId, ref: "QuoteDetails", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "AccountDetails", required: true },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "ContactDetails", required: true },
  policyNumber: { type: String, required: true, unique: true },
  productType: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  totalPremium: { type: Number, required: true },
  taxes: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  billingMethod: { type: String, required: true },
  paymentSchedule: { type: String, required: true },
  paymentRef: { type: String, required: true },
  coverages: [{ type: String }],
  status: { type: String, enum: ["In Force", "Pending", "Cancelled"], default: "In Force" },
  issuedAt: { type: Date, default: Date.now },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverDetails' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleDetails' },
});

module.exports = mongoose.model("PolicyDetails", policySchema);

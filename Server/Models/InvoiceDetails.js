const mongoose = require("mongoose");
// import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  totalCost: { type: Number, required: true },
  policyNumber: { type: mongoose.Schema.Types.ObjectId, ref: "PolicyDetails" },
  productType: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  totalPremium: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("InvoiceDetails", invoiceSchema);

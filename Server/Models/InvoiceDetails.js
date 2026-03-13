const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  totalCost: { type: Number, required: true },
  policyNumber: { type: String, required: true, index: true }, // ✅ Changed from ObjectId to String to match policy generation
  productType: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  totalPremium: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InvoiceDetails", invoiceSchema);

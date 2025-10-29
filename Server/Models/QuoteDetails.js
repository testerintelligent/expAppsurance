const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: "SubmissionDetails", required: true },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "ContactDetails", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "AccountDetails", required: true },
  productSelected: { type: String, required: true },
  quoteNumber: { type: String, required: true, unique: true },
  premiumAmount: { type: Number, required: true },
  coverages: [{ type: String }],
  effectiveDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ["Draft", "Quoted"], default: "Quoted" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuoteDetails", quoteSchema);

const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    claimId: { type: String, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contacts', required: true },
    policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCentre', required: true },
    claimType: { type: String, required: true },
    claimStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    claimAmount: { type: Number, required: true },
    claimDate: { type: Date, required: true },
    resolutionDate: { type: Date },
    details: { type: String },
    documents: [{ type: String }] // Array of file references
});

module.exports = mongoose.model('ClaimDetails', claimSchema);

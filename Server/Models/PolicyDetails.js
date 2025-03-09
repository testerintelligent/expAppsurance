const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyId: { type: String, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contacts', required: true },
    policyType: { type: String, required: true },
    coverageDetails: { type: String, required: true },
    premium: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Expired', 'Canceled'], default: 'Active' }
});

module.exports = mongoose.model('PolicyDetails', policySchema);

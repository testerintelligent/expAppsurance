const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    billingId: { type: String, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contacts', required: true },
    policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCentre', required: true },
    amount: { type: Number, required: true },
    billingDate: { type: Date, required: true },
    paymentDate: { type: Date },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Credit Card', 'Bank Transfer', 'PayPal'], required: true }
});

module.exports = mongoose.model('BillingDetails', billingSchema);

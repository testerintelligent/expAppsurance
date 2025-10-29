// Models/PaymentDetails.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // Reference to the Policy this payment is for
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy',
        required: true,
        index: true
    },

    transactionId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0.01
    },

    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'E-Check'],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Completed'
    },
    
    paymentDate: {
        type: Date,
        default: Date.now,
        index: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
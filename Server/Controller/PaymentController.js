// Controllers/PaymentController.js

const express = require('express');
const router = express.Router();
const Payment = require('../Models/PaymentDetails'); 

// --- POST: Create a new Payment ---
router.post('/', async (req, res) => {
    // IMPORTANT: req.body must contain a valid 'policyId'
    try {
        const newPayment = new Payment(req.body);
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (err) {
        res.status(400).json({ message: 'Error creating payment', error: err.message });
    }
});

// --- GET: Retrieve a single Payment by ID and populate the Policy ---
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('policyId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving payment', error: err.message });
    }
});

module.exports = router;
// ... (Add GET all, PUT, and DELETE methods)
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    customerId: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String }
    },
    dateOfBirth: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

contactSchema.pre('save', async function (next) {
    if (this.isNew && !this.customerId) {
        const randomSuffix = Date.now().toString().slice(-6); // e.g., "123456"
        this.customerId = `CUS${randomSuffix}`;
    }
    next();
});

module.exports = mongoose.model('ContactDetails', contactSchema);

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountId: { type: String, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactDetails', required: true }, 
  accountType: { type: String, enum: ['Individual', 'Corporate'], required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Closed'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  policies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PolicyDetails' }] // link to policies
});

// Auto-generate accountId if new
accountSchema.pre('save', function (next) {
  if (!this.accountId) {
    this.accountId = `ACC${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('AccountDetails', accountSchema);

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountId: { type: String, unique: true, index: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactDetails', required: true, index: true },
  accountType: { type: String, enum: ['Individual', 'Corporate'], required: true },
  accountHolderName: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Closed'], default: 'Active', index: true },
  createdAt: { type: Date, default: Date.now, index: true },
  lastUpdated: { type: Date, default: Date.now },
  policies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PolicyDetails' }],
});

// Auto-generate accountId if new
accountSchema.pre('save', function (next) {
  if (!this.accountId) {
    this.accountId = `ACC${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  this.lastUpdated = Date.now();
  next();
});

// Helper method: update status
accountSchema.methods.updateStatus = function(newStatus) {
  if (['Active', 'Inactive', 'Closed'].includes(newStatus)) {
    this.status = newStatus;
    this.lastUpdated = Date.now();
    return this.save();
  }
  throw new Error('Invalid status');
};

// Static method: find active accounts by customer
accountSchema.statics.findActiveByCustomer = function(customerId) {
  return this.find({ customerId, status: 'Active' });
};

module.exports = mongoose.model('AccountDetails', accountSchema);

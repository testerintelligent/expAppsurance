const mongoose = require('mongoose');
const Qualification = require('./Qualification');

// One field per qualification question, restricted to that question's options
const qualificationFields = Object.fromEntries(
  Qualification.DEFAULT_QUALIFICATIONS.map((q) => [q.code, { type: String, enum: q.options }])
);

const submissionSchema = new mongoose.Schema({
  submissionId: { type: String, unique: true, index: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountDetails', required: true, index: true },
  submissionStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', index: true },
  product: { type: String, required: true },
  termType: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  writtenDate: { type: Date, required: true },
  offering: { type: String, enum: ['Basic Program', 'Standard Program', 'Premium Program'] },
  // Qualification answers
  ...qualificationFields,
  createdAt: { type: Date, default: Date.now },
});

// Auto-generate submissionId if new
submissionSchema.pre('save', function (next) {
  if (!this.submissionId) {
    this.submissionId = `SUB${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Helper method: update status with validation
submissionSchema.methods.updateStatus = function(newStatus) {
  if (['Pending', 'Approved', 'Rejected'].includes(newStatus)) {
    this.submissionStatus = newStatus;
    return this.save();
  }
  throw new Error('Invalid submission status');
};

// Static method: find submissions by status
submissionSchema.statics.findByStatus = function(status) {
  return this.find({ submissionStatus: status });
};

module.exports = mongoose.model('SubmissionDetails', submissionSchema);

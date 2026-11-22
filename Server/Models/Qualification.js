const mongoose = require('mongoose');

// Default qualification questions shown on the Driver page.
// `code` is the field name used to store the answer on the submission.
const DEFAULT_QUALIFICATIONS = [
  {
    code: 'currentlyInsured',
    question: 'Is the applicant currently insured?',
    options: ['Yes', 'No - New Driver', 'No - previous policy not renewed', 'Not known'],
    required: true,
    sortOrder: 1,
  },
  {
    code: 'licenseCurrentlySuspended',
    question: "Is the applicant's license currently canceled or suspended?",
    options: ['Yes', 'No'],
    required: true,
    sortOrder: 2,
  },
  {
    code: 'licenseCanceledInPast',
    question: "Was the applicant's license canceled in the past?",
    options: ['Yes', 'No'],
    required: true,
    sortOrder: 3,
  },
  {
    code: 'trafficViolationInPast',
    question: 'Has the driver had a traffic violation in the past?',
    options: ['Yes', 'No'],
    required: true,
    sortOrder: 4,
  },
  {
    code: 'coverageDeclinedInPast',
    question: 'Was a policy or coverage declined in the past?',
    options: ['Yes', 'No'],
    required: true,
    sortOrder: 5,
  },
];

const qualificationSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  required: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Insert the default qualifications if they don't already exist (idempotent)
qualificationSchema.statics.seedDefaults = async function () {
  await Promise.all(
    DEFAULT_QUALIFICATIONS.map((q) =>
      this.updateOne({ code: q.code }, { $setOnInsert: { ...q, active: true } }, { upsert: true })
    )
  );
};

const Qualification = mongoose.model('Qualification', qualificationSchema);
Qualification.DEFAULT_QUALIFICATIONS = DEFAULT_QUALIFICATIONS;

module.exports = Qualification;

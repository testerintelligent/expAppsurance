const mongoose = require('mongoose');

const DEFAULT_OFFERINGS = ['Basic Program', 'Standard Program', 'Premium Program'];

const offeringSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  sortOrder: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Insert the default offerings if they don't already exist (idempotent)
offeringSchema.statics.seedDefaults = async function () {
  await Promise.all(
    DEFAULT_OFFERINGS.map((name, idx) =>
      this.updateOne(
        { name },
        { $setOnInsert: { name, sortOrder: idx + 1, active: true } },
        { upsert: true }
      )
    )
  );
};

const Offering = mongoose.model('Offering', offeringSchema);
Offering.DEFAULT_OFFERINGS = DEFAULT_OFFERINGS;

module.exports = Offering;

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  customerId: { type: String, unique: true, index: true },
  firstName: { type: String, required: true, trim: true, minlength: 2 },
  lastName: { type: String, required: true, trim: true, minlength: 2 },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    sparse: true,   // only indexes non-null values — blank strings must be coerced to null
    lowercase: true,
    trim: true,
    validate: {
      validator: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required.'],
    trim: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),   // exactly 10 digits
      message: props => `${props.value} is not a valid phone number. Must be exactly 10 digits.`
    }
  },
  dateOfBirth: { type: Date, required: true, validate: {
    validator: function(v) {
      return v < new Date();
    },
    message: 'Date of birth must be in the past.'
  }},
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  address: { type: String, trim: true },
  street: { type: String, trim: true },
  city: { type: String, trim: true, index: true }, // indexed for location queries
  state: { type: String, trim: true, index: true },
  zipCode: { type: String, trim: true, index: true },
  country: { type: String, trim: true },
  organization: { type: String, trim: true },
  producerCode: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now, index: true },
});

// Index compound example: fast lookup by name + dob
contactSchema.index({ firstName: 1, lastName: 1, dateOfBirth: 1 });

// Coerce empty-string email → undefined so the sparse unique index ignores it.
// An empty string IS a value to MongoDB and would cause duplicate-key errors
// when multiple contacts are saved without an email address.
contactSchema.pre('save', function (next) {
  if (this.email === '' || this.email === null) this.email = undefined;
  next();
});

// Auto-generate customerId if new
contactSchema.pre('save', function (next) {
  if (this.isNew && !this.customerId) {
    const randomSuffix = Date.now().toString().slice(-6);
    this.customerId = `CUS${randomSuffix}`;
  }
  next();
});

// Helper method: full name
contactSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

// Static method: find by full name (case insensitive)
contactSchema.statics.findByFullName = function(firstName, lastName) {
  return this.findOne({
    firstName: new RegExp(`^${firstName}$`, 'i'),
    lastName: new RegExp(`^${lastName}$`, 'i'),
  });
};

module.exports = mongoose.model('ContactDetails', contactSchema);

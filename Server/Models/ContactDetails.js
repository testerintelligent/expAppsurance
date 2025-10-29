const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  customerId: { type: String, unique: true, index: true },
  firstName: { type: String, required: true, trim: true, minlength: 2 },
  lastName: { type: String, required: true, trim: true, minlength: 2 },
  email: { 
    type: String, 
    unique: true, 
    sparse: true, 
    lowercase: true, 
    trim: true,
    validate: {
      validator: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), // email regex, optional
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: { 
    type: String, 
    trim: true,
    validate: {
      validator: v => !v || /^\+?[1-9]\d{1,14}$/.test(v), // basic E.164 phone format, optional
      message: props => `${props.value} is not a valid phone number!`
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
  organization: { type: String, trim: true },
  producerCode: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now, index: true },
});

// Index compound example: fast lookup by name + dob
contactSchema.index({ firstName: 1, lastName: 1, dateOfBirth: 1 });

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

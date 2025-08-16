const mongoose = require('mongoose');

// Personal Client Schema
const PersonalClientSchema = new mongoose.Schema({
  ClientNo: { type: String, unique: true },
  FirstName: { type: String, required: true },
  Surname: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  Gender: { type: String, required: true },
  MaritalStatus: { type: Boolean, required: true },
  Salutation: { type: String, required: true },
  InceptionDate: { type: Date, required: true },
  Income: { type: Number, required: true },
  LineofBusiness: { type: String, required: true },
  IDtype: { type: String, required: true },
  IDNumber: { type: String, required: true },
  AddressType: { type: String, required: true },
  PostalCode: { type: Number, required: true },
  BuildingName: { type: String, required: true },
  StreetName: { type: String, required: true },
  District: { type: String, required: true },
  City: { type: String, required: true },
  Country: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now }
});

const CorporateClientSchema = new mongoose.Schema({
  ClientNo: { type: String, unique: true },
  organization: { type: String, required: true },
  IndustryType: { type: String, required: true },
  RegistrationNumber: { type: String, required: true },
  FirstName: { type: String, required: true },
  Surname: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  Gender: { type: String, required: true },
  MaritalStatus: { type: Boolean, required: true },
  Salutation: { type: String, required: true },
  InceptionDate: { type: Date, required: true },
  Income: { type: Number, required: true },
  LineofBusiness: { type: String, required: true },
  IDtype: { type: String, required: true },
  IDNumber: { type: String, required: true },
  PostalCode: { type: Number, required: true },
  BuildingName: { type: String, required: true },
  StreetName: { type: String, required: true },
  District: { type: String, required: true },
  City: { type: String, required: true },
  Country: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now }
});

// Auto-generate ClientNo
PersonalClientSchema.pre("save", async function (next) {
  if (this.isNew && !this.ClientNo) {
    const randomSuffix = Date.now().toString().slice(-6);
    this.ClientNo = `CL${randomSuffix}`;
  }
  next();
});

CorporateClientSchema.pre("save", async function (next) {
  if (this.isNew && !this.ClientNo) {
    const randomSuffix = Date.now().toString().slice(-6);
    this.ClientNo = `CLC${randomSuffix}`;
  }
  next();
});

// Exporting Models
const PersonalClient = mongoose.model("PersonalClientDetails", PersonalClientSchema);
const CorporateClient = mongoose.model("CorporateClientDetails", CorporateClientSchema);

module.exports = {
  PersonalClient,
  CorporateClient
};

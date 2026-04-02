const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product: String,
  status: String,

  effectiveStartDate: Date,
  effectiveEndDate: Date,
  
  rateTables: [String],
  rateRoutines: [String],
});

module.exports = mongoose.model("RateBook", schema);
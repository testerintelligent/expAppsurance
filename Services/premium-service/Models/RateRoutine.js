const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  formula: String
});

module.exports = mongoose.model("RateRoutine", schema);
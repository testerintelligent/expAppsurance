const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  type: String,
  data: Array
});

module.exports = mongoose.model("RateTable", schema);
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const authSchema = new mongoose.Schema({
  username: String,
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: Boolean,
});

authSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

module.exports = mongoose.model("Auth", authSchema);

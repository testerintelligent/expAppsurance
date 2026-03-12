const Auth = require("../Models/authDetails");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.signup = async (req, res) => {
  let user = await Auth.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new Auth(_.pick(req.body, ["username", "password", "email"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "email"]));
};

exports.login = async (req, res) => {
  let user = await Auth.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
};

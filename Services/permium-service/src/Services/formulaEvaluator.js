const math = require("mathjs");

module.exports = (formula, vars) => {
  return math.evaluate(formula, vars);
};
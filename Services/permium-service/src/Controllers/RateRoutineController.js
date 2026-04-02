const RateRoutine = require("../Models/RateRoutine");

exports.createRateRoutine = async (req, res) => {
  const { name, formula } = req.body;

  await RateRoutine.findOneAndUpdate(
    { name },
    { name, formula },
    { upsert: true }
  );

  res.json({ success: true });
};
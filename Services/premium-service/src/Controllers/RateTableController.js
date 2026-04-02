const RateTable = require("../Models/RateTable");

exports.createRateTable = async (req, res) => {
  const { name, type, data } = req.body;

  await RateTable.findOneAndUpdate(
    { name },
    { name, type, data },
    { upsert: true }
  );

  res.json({ success: true });
};
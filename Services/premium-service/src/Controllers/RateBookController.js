const RateBook = require("../Models/RateBook");

// CREATE
exports.createRateBook = async (req, res) => {
  const data = req.body;

  await RateBook.create(data);

  res.json({ success: true });
};

// HISTORY
exports.getHistory = async (req, res) => {
  const { product } = req.query;

  const data = await RateBook.find({ product })
    .sort({ effectiveStartDate: -1 });

  res.json({ success: true, data });
};

// STATUS UPDATE
exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;

  await RateBook.findByIdAndUpdate(id, { status });

  res.json({ success: true });
};
const RateBook = require("../Models/RateBook");

// CREATE
exports.createRateBook = async (req, res) => {
  const data = req.body;

  await RateBook.create(data);

  res.json({ success: true });
};

exports.getHistory = async (req, res) => {
  const { product } = req.query;

  const data = await RateBook.find({ product })
    .sort({ effectiveStartDate: -1 });

  res.json({ success: true, data });
};

exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;

  await RateBook.findByIdAndUpdate(id, { status });

  res.json({ success: true });
};

exports.getAllRateBooks = async (req, res) => {
  try {
    const rateBooks = await RateBook.find().sort({ effectiveStartDate: -1 });
    res.json({ success: true, data: rateBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const rateBook = await RateBook.findById(id);

    if (!rateBook) {
      return res.status(404).json({ success: false, error: "Rate book not found" });
    }

    res.json({ success: true, data: rateBook });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRateBooksByProduct = async (req, res) => {
  try {
    const { product } = req.params;
    const rateBooks = await RateBook.find({ product }).sort({ effectiveStartDate: -1 });

    if (!rateBooks || rateBooks.length === 0) {
      return res.status(404).json({ success: false, error: "No rate books found for this product" });
    }

    res.json({ success: true, data: rateBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getActiveRateBook = async (req, res) => {
  try {
    const { product } = req.params;
    const rateBook = await RateBook.findOne({ product, status: "Active" });

    if (!rateBook) {
      return res.status(404).json({ success: false, error: "No active rate book found for this product" });
    }

    res.json({ success: true, data: rateBook });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
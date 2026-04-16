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

exports.getAllRateTables = async (req, res) => {
  try {
    const rateTables = await RateTable.find();
    res.json({ success: true, data: rateTables });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRateTableByName = async (req, res) => {
  try {
    const { name } = req.params;
    const rateTable = await RateTable.findOne({ name });

    if (!rateTable) {
      return res.status(404).json({ success: false, error: "Rate table not found" });
    }

    res.json({ success: true, data: rateTable });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRateTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const rateTable = await RateTable.findById(id);

    if (!rateTable) {
      return res.status(404).json({ success: false, error: "Rate table not found" });
    }

    res.json({ success: true, data: rateTable });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
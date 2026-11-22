// Controller/OfferingController.js
const Offering = require('../Models/Offering');

// Get all active offerings
exports.getOfferings = async (req, res) => {
  try {
    const offerings = await Offering.find({ active: true }).sort({ sortOrder: 1, name: 1 });
    res.json(offerings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to fetch offerings' });
  }
};

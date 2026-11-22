// Controller/QualificationController.js
const Qualification = require('../Models/Qualification');

// Get all active qualification questions with their options
exports.getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find({ active: true }).sort({ sortOrder: 1, code: 1 });
    res.json(qualifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to fetch qualifications' });
  }
};

// Get one qualification question by code
exports.getQualificationByCode = async (req, res) => {
  try {
    const qualification = await Qualification.findOne({ code: req.params.code, active: true });
    if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
    res.json(qualification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to fetch qualification' });
  }
};

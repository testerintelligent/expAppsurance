const Vehicle = require('../Models/VehicleDetails');
const Submission = require('../Models/SubmissionDetails');

// ➕ Create Vehicle for a Submission
exports.createVehicle = async (req, res) => {
  try {
    const { submissionId } = req.body;

    // Validate Submission exists
    const submission = await Submission.findOne({ submissionId });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const vehicle = new Vehicle({ ...req.body, submissionId });
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔍 Get Vehicles by Submission
exports.getVehiclesBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const vehicles = await Vehicle.find({ submissionId });
    res.status(200).json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✏️ Update Vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.status(200).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

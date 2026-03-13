const Driver = require("../Models/DriverDetails");
const Submission = require("../Models/SubmissionDetails");

// ➕ Create a driver for a submission
exports.createDriver = async (req, res) => {
  try {
    const { submissionId, ...driverData } = req.body;
    
    console.log("🔍 Received submissionId:", submissionId);
    console.log("🔍 Request body keys:", Object.keys(req.body));

    if (!submissionId) {
      return res.status(400).json({
        message: "submissionId is required",
      });
    }

    console.log("✅ Creating driver for submissionId:", submissionId);
    
    // ✅ Validate Submission exists (works even if submissionId is a string like SUB1760xxxx)
    const submission = await Submission.findOne({ submissionId });
    console.log("🔍 Submission lookup result:", submission ? "Found" : "Not found");
    
    if (!submission) {
      console.log("❌ Submission not found with submissionId:", submissionId);
      return res.status(404).json({
        message: `Submission not found for ID: ${submissionId}`,
      });
    }

    console.log("✅ Submission found:", submission.submissionId);

    // 🧩 Create driver linked to this submission using the string submissionId
    const driver = new Driver({
      ...driverData,
      submissionId: submissionId, // ✅ Use the string submissionId passed from frontend
    });

    console.log("📝 Saving driver with submissionId:", driver.submissionId);
    await driver.save();
    console.log("✅ Driver saved successfully. Driver ID:", driver._id);
    
    res.status(201).json({
      message: "Driver created successfully",
      driver,
    });
  } catch (err) {
    console.error("❌ Error creating driver:", err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔍 Get all drivers for a submission
exports.getDriversBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    
    console.log("Fetching drivers for submissionId:", submissionId);

    const drivers = await Driver.find({ submissionId });
    
    console.log(`Found ${drivers.length} drivers for submissionId: ${submissionId}`);
    
    if (!drivers || drivers.length === 0) {
      return res.status(200).json([]); // ✅ Return empty array instead of 404 for better frontend handling
    }

    res.status(200).json(drivers);
  } catch (err) {
    console.error("❌ Error fetching drivers:", err);
    res.status(500).json({ message: "Server error while fetching drivers" });
  }
};

// 🔍 Get all drivers for an account (across all submissions)
exports.getDriversByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    
    console.log("Fetching drivers for accountId:", accountId);

    // First get all submissions for this account
    const Submission = require("../Models/SubmissionDetails");
    const submissions = await Submission.find({ accountId });
    
    if (!submissions || submissions.length === 0) {
      return res.status(200).json([]); // No submissions, no drivers
    }

    const submissionIds = submissions.map(s => s.submissionId);
    
    // Get all unique drivers across these submissions
    const drivers = await Driver.find({ submissionId: { $in: submissionIds } });
    
    console.log(`Found ${drivers.length} drivers for accountId: ${accountId}`);
    
    res.status(200).json(drivers);
  } catch (err) {
    console.error("❌ Error fetching drivers by account:", err);
    res.status(500).json({ message: "Server error while fetching drivers" });
  }
};

// ✏️ Update a driver
exports.updateDriver = async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await Driver.findByIdAndUpdate(driverId, req.body, {
      new: true,
    });
    if (!driver) {
      return res
        .status(404)
        .json({ message: `Driver not found with ID: ${driverId}` });
    }

    res.status(200).json({
      message: "Driver updated successfully",
      driver,
    });
  } catch (err) {
    console.error("❌ Error updating driver:", err);
    //   res.status(500).json({ message: "Server error while updating driver" });
    res.status(500).json({
      message: err.message,
    });
  }
};

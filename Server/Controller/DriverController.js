const Driver = require("../Models/DriverDetails");
const Submission = require("../Models/SubmissionDetails");

// ➕ Create a driver for a submission
exports.createDriver = async (req, res) => {
  try {
    const { submissionId, ...driverData } = req.body;
    console.log("submi111", submissionId);
    let finalSubmissionId = null;
    console.log("submi", submissionId);
    // 🔍 Validate Submission exists (works even if submissionId is a string like SUB1760xxxx)
    if (submissionId) {
      const submission = await Submission.findOne({ submissionId });
      console.log("submission", submission);
      // if (!submission) {
      //   return res.status(404).json({
      //     message: `Submission not found for ID: ${submissionId}`,
      //   });
      // }

      finalSubmissionId = submission.submissionId;
    }
    // const submission = await Submission.findOne({ submissionId });

    // if (!submission) {
    //   return res
    //     .status(404)
    //     .json({ message: `Submission not found for ID: ${submissionId}` });

    // }

    // 🧩 Create driver linked to this submission
    const driver = new Driver({
      ...driverData,
      // submissionId: linkedSubmissionId,
      submissionId: finalSubmissionId,
      // submissionId: submission.submissionId, // store string ID, not Mongo _id
    });

    await driver.save();
    console.log("messgae");
    res.status(201).json({
      message: "Driver created successfully",
      driver,
    });
  } catch (err) {
    console.error("❌ Error creating driver:", err);
    res.status(500).json({
      message: err.message,
    });
    // res.status(500).json({ message: 'Server error while creating driver' });
  }
};

// 🔍 Get all drivers for a submission
exports.getDriversBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const drivers = await Driver.find({ submissionId });
    if (!drivers || drivers.length === 0) {
      return res
        .status(404)
        .json({ message: `No drivers found for submission ${submissionId}` });
    }

    res.status(200).json(drivers);
  } catch (err) {
    console.error("❌ Error fetching drivers:", err);
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

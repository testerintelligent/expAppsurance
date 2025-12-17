const Claim = require("../Models/ClaimDetails");

const generateClaimNumber = () =>
  "CLM" + Math.floor(100000000 + Math.random() * 900000000);

exports.createClaim = async (req, res) => {
  try {
    const payload = req.body;

    const claim = new Claim({
      claimNumber: generateClaimNumber(),
      ...payload,
    });

    await claim.save();

    res.status(201).json({
      message: "Claim created successfully",
      claim,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create claim" });
  }
};

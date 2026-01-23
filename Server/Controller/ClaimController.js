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
 
// GET /api/claims/list - return all claims (optionally filter by policyNumber)
exports.getClaimsList = async (req, res) => {
  try {
    const { policyNumber } = req.query;
    const filter = {};
    if (policyNumber) filter.policyNumber = policyNumber;
 
    // fetch all matching claims, most recent first
    const claims = await Claim.find(filter).sort({ createdAt: -1 }).lean();
 
    return res.status(200).json({ count: claims.length, claims });
  } catch (error) {
    console.error("Error fetching claims list:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch claims", error: error.message });
  }
};
 
// GET /api/claims/search/:claimNumber - find a claim by its claimNumber
exports.getClaimByNumber = async (req, res) => {
  try {
    const { claimNumber } = req.params;
    if (!claimNumber)
      return res.status(400).json({ message: "claimNumber parameter is required" });
 
    const claim = await Claim.findOne({ claimNumber: claimNumber }).lean();
    if (!claim) return res.status(404).json({ message: "Claim not found" });
 
    return res.status(200).json({ claim });
  } catch (error) {
    console.error("Error fetching claim by number:", error);
    return res.status(500).json({ message: "Failed to fetch claim", error: error.message });
  }
};
 
 
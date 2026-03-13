const Policy = require("../Models/PolicyDetails");
const Account = require("../Models/AccountDetails");
const Contact = require("../Models/ContactDetails");
const Driver = require("../Models/DriverDetails");
const Vehicle = require("../Models/VehicleDetails");

exports.createPolicy = async (req, res) => {
  try {
    const {
      submissionId,
      quoteId,
      accountId,
      contactId,
      productType,
      effectiveDate,
      expiryDate,
      totalPremium,
      taxes,
      totalCost,
      billingMethod,
      paymentSchedule,
      coverages,
    } = req.body;

    console.log("📤 Creating policy with submission:", submissionId);
    console.log("📤 Policy payload:", { submissionId, quoteId, accountId, contactId, productType });

    // --- Validate required fields ---
    if (!submissionId || !accountId || !quoteId || !productType) {
      return res.status(400).json({ message: "Missing required fields: submissionId, accountId, quoteId, productType" });
    }

    // --- Sanitize contactId (convert empty string to null) ---
    const sanitizedContactId = contactId && contactId.trim() !== "" ? contactId : null;

    // Generate unique policy number (POL + timestamp, no hyphen)
    const policyNumber = "POL" + Date.now();

    // Generate unique payment reference
    const paymentRef = "PAY" + Math.floor(100000 + Math.random() * 900000);

    console.log("✅ Creating new policy with policyNumber:", policyNumber);

    // Create new policy
    const newPolicy = new Policy({
      submissionId,
      quoteId,
      accountId,
      contactId: sanitizedContactId, //Use sanitized contactId (null if empty)
      productType,
      effectiveDate: new Date(effectiveDate),
      expiryDate: new Date(expiryDate),
      totalPremium,
      taxes,
      totalCost,
      billingMethod,
      paymentSchedule,
      coverages: coverages || [],
      policyNumber,
      paymentRef,
      status: "In Force",
    });

    // Save the new policy
    const savedPolicy = await newPolicy.save();

    console.log("✅ Policy saved successfully with ID:", savedPolicy._id);

    // Now, update the corresponding account by adding the policy to the `policies` field
    const account = await Account.findById(accountId);
    if (!account) {
      console.error("❌ Account not found with ID:", accountId);
      return res.status(404).json({ message: "Account not found" });
    }

    // Add the new policy's ObjectId to the account's `policies` array
    account.policies.push(savedPolicy._id);

    // Save the updated account
    await account.save();

    console.log("✅ Policy associated with account. Account now has", account.policies.length, "policies");

    res.status(201).json({
      message: "Policy created and associated with account successfully",
      policy: savedPolicy,
      account: account,
    });
  } catch (err) {
    console.error("❌ Error creating policy:", err);
    res.status(500).json({ message: "Server error while creating policy", error: err.message });
  }
};

exports.getAllPolicies = async (req, res) => {
  try {
    // Fetch all policies from the database
    const policies = await Policy.find({});

    // Map policies to return only relevant information
    const policyData = policies.map(policy => ({
      policyNumber: policy.policyNumber,
      productType: policy.productType,
      effectiveDate: policy.effectiveDate,
      expiryDate: policy.expiryDate,
      totalPremium: policy.totalPremium,
      totalCost: policy.totalCost,
      status: policy.status,
      // Add other fields if needed, like customer info from other collections
    }));

    res.status(200).json({
      message: "Policies fetched successfully",
      policies: policyData,
    });
  } catch (err) {
    console.error("Error fetching policies:", err);
    res.status(500).json({ message: "Error fetching policies" });
  }
};

exports.getPoliciesForDashboard = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate({
        path: "accountId", 
        select: "accountId accountHolderName",
      })
      .select("policyNumber productType effectiveDate expiryDate status")
      .exec();

    const policyDashboardData = policies.map((policy) => ({
      accountNumber: policy.accountId ? policy.accountId.accountId : "N/A",  
      accountHolderName: policy.accountId ? policy.accountId.accountHolderName : "Unknown",  
      policyNumber: policy.policyNumber,
      policyType: policy.productType,
      startDate: policy.effectiveDate,
      endDate: policy.expiryDate,
      status: policy.status,
    }));


    res.status(200).json(policyDashboardData);
  } catch (err) {
    console.error("Error fetching policies for dashboard:", err);
    res.status(500).json({ message: "Server error fetching policies", error: err.message });
  }
};

exports.getPolicyByNumber = async (req, res) => {
  const { policyNumber } = req.params;

  const policy = await Policy.findOne({ policyNumber })
    .populate('accountId')
    .populate('contactId')
    .populate('claims');

  if (!policy) {
    return res.status(404).json({ message: 'Policy not found' });
  }

  const vehicles = await Vehicle.find({
    submissionId: policy.submissionId,
  });

  const drivers = await Driver.find({
    submissionId: policy.submissionId,
  });

  res.json({
    policy,
    contact: policy.contactId,
    account: policy.accountId,
    vehicle: vehicles,
    driver: drivers
  });
};


///API's for Claim Module
 
exports.getAllPoliciesWithContactAndAddress = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate("accountId")
      .populate("contactId")
      .populate("driverId")
      .populate("vehicleId")
      .exec();

    const payload = policies.map((p) => ({
      _id: p._id,
      policyNumber: p.policyNumber,
      policyId: p.policyId,
      productType: p.productType,
      effectiveDate: p.effectiveDate,
      expiryDate: p.expiryDate,
      totalPremium: p.totalPremium,
      totalCost: p.totalCost,
      status: p.status,
      account: p.accountId || null,
      contact: p.contactId || null,
      driver: p.driverId || null,
      vehicle: p.vehicleId || null,
    }));

    res.status(200).json({ message: "Policies fetched for claim search", data: payload });
  } catch (err) {
    console.error("Error fetching policies for claim search:", err);
    res.status(500).json({ message: "Server error fetching policies", error: err.message });
  }
};


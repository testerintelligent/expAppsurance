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

    // Generate unique policy number
    const policyNumber = "POL" + Math.floor(100000000 + Math.random() * 900000000);

    // Generate unique payment reference
    const paymentRef = "PAY" + Math.floor(100000000 + Math.random() * 900000000);

    // Create new policy
    const newPolicy = new Policy({
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
      policyNumber,
      paymentRef,
      status: "In Force",
    });

    // Save the new policy
    const savedPolicy = await newPolicy.save();

    // Now, update the corresponding account by adding the policy to the `policies` field
    const account = await Account.findById(accountId); // Assuming `accountId` is passed correctly in the request body
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Add the new policy's ObjectId to the account's `policies` array
    account.policies.push(savedPolicy._id);

    // Save the updated account
    await account.save();

    res.status(201).json({
      message: "Policy created and associated with account successfully",
      policy: savedPolicy,
      account: account,
    });
  } catch (err) {
    console.error("Error creating policy:", err);
    res.status(500).json({ message: "Server error while creating policy" });
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
  try {

    const policy = await Policy.findOne({ policyNumber })
      .populate("accountId")
      .populate("contactId") 
      .populate("driverId")   
      .populate("vehicleId"); 

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    console.log("Fetched Policy:", policy);
     
    res.json({
      policy,
      contact: policy.contactId,
      account: policy.accountId,
      driver: policy.driverId,
      vehicle: policy.vehicleId,
    });
  } catch (err) {
    console.error("Error fetching policy details:", err);
    res.status(500).json({ message: "Server error while fetching policy details" });
  }
};
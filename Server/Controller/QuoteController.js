// controllers/QuoteController.js
const mongoose = require("mongoose");
const Quote = require("../Models/QuoteDetails");
const Submission = require("../Models/SubmissionDetails");

// ➕ Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const {
      submissionId,  // String format
      contactId,
      accountId,
      productSelected,
      premiumAmount,
      coverages,
      effectiveDate,
      expiryDate,
      vehicleData,
    } = req.body;

    console.log("📤 Creating quote with submissionId:", submissionId);
    console.log("📤 Quote payload:", req.body);

    // --- Validate required fields ---
    if (!submissionId || !accountId || !premiumAmount) {
      return res.status(400).json({ message: "Missing required fields: submissionId, accountId, premiumAmount" });
    }

    // --- Find Submission ---
    let submission = null;

    // Try to find by submissionId string first (preferred)
    submission = await Submission.findOne({ submissionId: submissionId });

    if (!submission) {
      console.error(`❌ Submission not found with submissionId: ${submissionId}`);
      return res.status(404).json({ message: `Submission not found with ID: ${submissionId}` });
    }

    console.log("✅ Found submission:", submission._id);

    // --- Generate Unique Quote Number ---
    const quoteNumber = "QTE" + Math.floor(100000 + Math.random() * 900000);

    // --- Create Quote ---
    const newQuote = new Quote({
      submissionId: submissionId, // ✅ Store as string, matching SubmissionDetails.submissionId
      contactId: contactId || submission.contactId,
      accountId: accountId,
      productSelected: productSelected || submission.product,
      premiumAmount,
      coverages: coverages || [],
      effectiveDate: effectiveDate ? new Date(effectiveDate) : submission.effectiveDate,
      expiryDate: expiryDate ? new Date(expiryDate) : submission.expirationDate,
      quoteNumber,
    });

    await newQuote.save();

    console.log("✅ Quote created successfully:", newQuote._id);

    res.status(201).json({
      message: "Quote created successfully",
      quoteId: newQuote._id,
      quoteNumber: newQuote.quoteNumber,
      data: newQuote,
    });

  } catch (err) {
    console.error("❌ Error creating quote:", err);
    res.status(500).json({ message: "Server error while creating quote", error: err.message });
  }
};

// 🔍 Get all quotes for a submission
exports.getQuotesBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    console.log("Fetching quotes for submissionId:", submissionId);

    // Find submission by submissionId string
    const submission = await Submission.findOne({ submissionId });

    if (!submission) {
      console.error(`❌ Submission not found with submissionId: ${submissionId}`);
      return res.status(404).json({ message: "Submission not found" });
    }

    // Fetch quotes using string submissionId
    const quotes = await Quote.find({ submissionId: submissionId })
      .populate("accountId", "accountNumber accountName");

    console.log(`Found ${quotes.length} quotes for submissionId: ${submissionId}`);

    if (!quotes || quotes.length === 0) {
      return res.status(200).json({ 
        message: "No quotes found for this submission",
        count: 0,
        data: []
      });
    }

    res.status(200).json({
      message: "Quotes fetched successfully",
      count: quotes.length,
      data: quotes,
    });

  } catch (err) {
    console.error("❌ Error fetching quotes:", err);
    res.status(500).json({ message: "Server error while fetching quotes" });
  }
};

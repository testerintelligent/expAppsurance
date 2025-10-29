// controllers/QuoteController.js
const mongoose = require("mongoose");
const Quote = require("../Models/QuoteDetails");
const Submission = require("../Models/SubmissionDetails");

// ➕ Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const {
      submissionId,  // Can be MongoDB ObjectId or SubmissionId string
      contactId,
      accountId,
      productSelected,
      premiumAmount,
      coverages,
      effectiveDate,
      expiryDate,
    } = req.body;

    // --- Find Submission ---
    let submission = null;

    // Check if submissionId is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(submissionId)) {
      submission = await Submission.findById(submissionId);
    }

    // If not found, try searching by submissionId string
    if (!submission) {
      submission = await Submission.findOne({ submissionId });
    }

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // --- Generate Unique Quote Number ---
    const quoteNumber = "QTE" + Math.floor(100000 + Math.random() * 900000);

    // --- Create Quote ---
    const newQuote = new Quote({
      submissionId: submission._id, // Always store ObjectId
      contactId,
      accountId,
      productSelected: productSelected || submission.product, // fallback to submission product
      premiumAmount,
      coverages,
      effectiveDate: effectiveDate || submission.effectiveDate,
      expiryDate: expiryDate || submission.expirationDate,
      quoteNumber,
    });

    await newQuote.save();

    res.status(201).json({
      message: "Quote created successfully",
      quoteId: newQuote._id,
      quoteNumber: newQuote.quoteNumber,
      data: newQuote,
    });

  } catch (err) {
    console.error("Error creating quote:", err);
    res.status(500).json({ message: "Server error while creating quote" });
  }
};

// 🔍 Get all quotes for a submission
exports.getQuotesBySubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    let submission = null;

    // Check if submissionId is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(submissionId)) {
      submission = await Submission.findById(submissionId);
    }

    // If not found, search by submissionId string
    if (!submission) {
      submission = await Submission.findOne({ submissionId });
    }

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Fetch quotes
    const quotes = await Quote.find({ submissionId: submission._id })
      .populate("submissionId", "submissionId product")
      .populate("contactId", "firstName lastName email")
      .populate("accountId", "accountNumber accountName");

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ message: "No quotes found for this submission" });
    }

    res.status(200).json({
      message: "Quotes fetched successfully",
      count: quotes.length,
      data: quotes,
    });

  } catch (err) {
    console.error("Error fetching quotes:", err);
    res.status(500).json({ message: "Server error while fetching quotes" });
  }
};

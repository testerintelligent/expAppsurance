// Controller/SubmissionController.js
const SubmissionDetails = require('../Models/SubmissionDetails');
const AccountDetails = require('../Models/AccountDetails');

// Create a new submission
exports.createSubmission = async (req, res) => {
  try {
    const { accountId, product, termType, effectiveDate, expirationDate, writtenDate } = req.body;

    // Check if account exists
    const account = await AccountDetails.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    const submission = await SubmissionDetails.create({
      accountId,
      product,
      termType,
      effectiveDate,
      expirationDate,
      writtenDate,
    });

    res.status(201).json({ submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to create submission' });
  }
};

// Get all submissions for an account
exports.getSubmissionsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const submissions = await SubmissionDetails.find({ accountId }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to fetch submissions' });
  }
};

// Get submission by submissionId
exports.getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await SubmissionDetails.findOne({ submissionId });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to fetch submission' });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await SubmissionDetails.findOneAndDelete({ submissionId });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to delete submission' });
  }
};

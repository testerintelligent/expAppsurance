const express = require("express");
const router = express.Router();
const quoteController = require("../Controller/QuoteController");

router.post("/createQuote", quoteController.createQuote);
router.get("/submission/:submissionId", quoteController.getQuotesBySubmission);

module.exports = router;

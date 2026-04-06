const router = require("express").Router();
const {
  createRateBook,
  getHistory,
  updateStatus
} = require("../Controllers/RateBookController");

router.post("/create", createRateBook);
router.get("/history", getHistory);
router.put("/status", updateStatus);

module.exports = router;
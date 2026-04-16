const router = require("express").Router();
const {
  createRateBook,
  getHistory,
  updateStatus,
  getAllRateBooks,
  getRateBookById,
  getRateBooksByProduct,
  getActiveRateBook
} = require("../Controllers/RateBookController");

// POST endpoints
router.post("/create", createRateBook);

// GET endpoints - SPECIFIC ROUTES FIRST, THEN GENERIC
router.get("/history", getHistory);
router.get("/product/:product/active", getActiveRateBook);
router.get("/product/:product", getRateBooksByProduct);
router.get("/:id", getRateBookById);
router.get("/", getAllRateBooks);

// PUT endpoints
router.put("/status", updateStatus);

module.exports = router;
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

// GET endpoints
router.get("/", getAllRateBooks);
router.get("/product/:product", getRateBooksByProduct);
router.get("/product/:product/active", getActiveRateBook);
router.get("/:id", getRateBookById);

// Legacy endpoints
router.get("/history", getHistory);
router.put("/status", updateStatus);

module.exports = router;
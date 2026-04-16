const router = require("express").Router();
const { 
  createRateTable,
  getAllRateTables,
  getRateTableByName,
  getRateTableById
} = require("../Controllers/RateTableController");

// POST endpoints
router.post("/create", createRateTable);

// GET endpoints
router.get("/", getAllRateTables);
router.get("/name/:name", getRateTableByName);
router.get("/:id", getRateTableById);

module.exports = router;
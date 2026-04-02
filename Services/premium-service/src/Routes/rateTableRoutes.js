const router = require("express").Router();
const { createRateTable } = require("../Controllers/RateTableController");

router.post("/create", createRateTable);

module.exports = router;
const router = require("express").Router();
const { createRateTable } = require("../Controller/RateTableController");

router.post("/create", createRateTable);

module.exports = router;
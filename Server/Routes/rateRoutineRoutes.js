const router = require("express").Router();
const { createRateRoutine } = require("../Controller/RateRoutineController");

router.post("/create", createRateRoutine);

module.exports = router;
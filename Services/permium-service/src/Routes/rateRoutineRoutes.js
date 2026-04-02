const router = require("express").Router();
const { createRateRoutine } = require("../Controllers/RateRoutineController");

router.post("/create", createRateRoutine);

module.exports = router;
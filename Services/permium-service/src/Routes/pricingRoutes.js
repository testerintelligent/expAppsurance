const router = require("express").Router();
const { calculate } = require("../Controllers/PricingController");
router.post("/calculate", calculate);

module.exports = router;
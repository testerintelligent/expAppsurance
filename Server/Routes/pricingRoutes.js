const router = require("express").Router();
const { calculate } = require("../Controller/PricingController");

router.post("/calculate", calculate);

module.exports = router;
const express = require("express");
const router = express.Router();
const policyController = require("../Controller/PolicyController");

router.post("/createPolicy", policyController.createPolicy);
router.get("/getAllPolicies", policyController.getAllPolicies);
router.get("/getPoliciesForDashboard", policyController.getPoliciesForDashboard);
router.get("/getPolicyByNumber/:policyNumber", policyController.getPolicyByNumber);

module.exports = router;

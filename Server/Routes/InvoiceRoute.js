const express = require("express");
const router = express.Router();
const invoiceController = require("../Controller/InvoiceController");

router.post("/createInvoice", invoiceController.createInvoice);
router.get("/getAllInvoices", invoiceController.getAllInvoice);
router.get(
  "/getInvoiceByPolicyNumber/:policyNumber",
  invoiceController.getInvoiceByPolicyNumber
);
module.exports = router;
// export default router;

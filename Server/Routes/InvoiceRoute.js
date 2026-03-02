const express = require("express");
const router = express.Router();
const invoiceController = require("../Controller/InvoiceController");

router.post("/createInvoice", invoiceController.createInvoice);
module.exports = router;
// export default router;

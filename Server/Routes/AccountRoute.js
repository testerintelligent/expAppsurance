const express = require("express");
const router = express.Router();
const accountController = require("../Controller/AccountController");

router.post("/createAccount", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.get("/byContact/:contactId", accountController.getAccountByContact);
router.put("/:id", accountController.updateAccount);
router.delete("/:id", accountController.deleteAccount);

module.exports = router;

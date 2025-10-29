const express = require("express");
const router = express.Router();
const contactController = require("../Controller/ContactController");

router.post("/", contactController.createContact);
router.get("/", contactController.searchContact);
router.delete("/:id", contactController.deleteContact);
router.put("/:id", contactController.editContact);

module.exports = router;

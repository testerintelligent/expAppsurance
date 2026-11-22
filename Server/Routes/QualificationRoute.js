// Routes/QualificationRoute.js
const express = require('express');
const router = express.Router();
const qualificationController = require('../Controller/QualificationController');

router.get('/', qualificationController.getQualifications);
router.get('/:code', qualificationController.getQualificationByCode);

module.exports = router;

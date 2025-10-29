// Routes/SubmissionRoutes.js
const express = require('express');
const router = express.Router();
const submissionController = require('../Controller/SubmissionController');

router.post('/', submissionController.createSubmission);
router.get('/account/:accountId', submissionController.getSubmissionsByAccount);
router.get('/:submissionId', submissionController.getSubmissionById);
router.delete('/:submissionId', submissionController.deleteSubmission);

module.exports = router;

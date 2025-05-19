const express = require('express');
const router = express.Router();
const { createComplaint } = require('../controllers/complaintController');

router.post('/complaint', createComplaint);

module.exports = router;

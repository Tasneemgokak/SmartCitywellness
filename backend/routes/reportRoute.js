const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createReport }  = require('../controllers/reportController');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST route only
router.post(
  '/report',
  upload.fields([
    { name: 'image', maxCount: 1 }, // image support
    { name: 'audio', maxCount: 1 } // audio support
  ]),
  createReport // Function calling of ReportController not file
);

router.get('/', (req, res) => {
  res.send('POST only - use Postman or curl to submit a report');
});

module.exports = router;

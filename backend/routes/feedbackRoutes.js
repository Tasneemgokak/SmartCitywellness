const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createFeedback } = require('../controllers/feedbackController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/feedback', upload.fields([
  { name: 'imageBefore', maxCount: 1 },
  { name: 'imageAfter', maxCount: 1 }
]), createFeedback);

module.exports = router;

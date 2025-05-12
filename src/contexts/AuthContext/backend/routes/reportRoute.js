const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createReport } = require('../controllers/reportController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/report', upload.single('image'), createReport);

module.exports = router;

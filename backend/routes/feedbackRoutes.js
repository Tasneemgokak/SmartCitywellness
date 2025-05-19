const express = require('express');
const router = express.Router();
const { createFeedback } = require('../controllers/feedbackController');

// Handle JSON-based feedback (no file uploads)
router.post('/feedback', createFeedback);

router.get('/', (req, res) => {
  res.send('Feedback endpoint working. Use POST to submit feedback.');
});

module.exports = router;

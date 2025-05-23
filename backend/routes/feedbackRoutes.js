const express = require('express');
const router = express.Router();
const { createFeedback } = require('../controllers/feedbackController');

// POST feedback (no auth needed)
router.post('/', createFeedback);

router.get('/', (req, res) => {
  res.send('Feedback endpoint working. Use POST /api/feedbacks to submit feedback.');
});

module.exports = router;

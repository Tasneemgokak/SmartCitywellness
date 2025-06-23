const { v4: uuidv4 } = require('uuid');
const Feedback = require('../models/Feedback');
const admin = require('../config/firebaseAdmin'); // Your Firebase Admin SDK setup

exports.createFeedback = async (req, res) => {
  try {
    const { rating, message, date, beforeImage, afterImage, name, email } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ error: 'Rating and message are required.' });
    }

    const newFeedback = new Feedback({
      feedbackId: uuidv4(),
      name: name || "Anonymous",        // fallback
      email: email || "unknown@example.com",
      rating,
      message,
      date: date || new Date().toISOString(),
      beforeImage,
      afterImage,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: newFeedback.feedbackId });
  } catch (err) {
    console.error('Feedback error:', err.message);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

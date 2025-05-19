const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackId: {
    type: String,
    unique: true,
    required: true,
  },

  userId: String,
  rating: Number,
  review: String,
  imageBefore: String,
  imageAfter: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

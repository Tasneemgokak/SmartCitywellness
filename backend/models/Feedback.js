const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  date: { type: String },
  beforeImage: String, // Base64 or image path
  afterImage: String   // Base64 or image path
});

module.exports = mongoose.model('Feedback', feedbackSchema);
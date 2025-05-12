const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: String,
  severity: String,
  location: String,
  imagePath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);

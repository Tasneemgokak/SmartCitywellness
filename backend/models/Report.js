const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  issue: { type: String },
  prediction: { type: String },
  severity: { type: String },
  location: {
    lat: Number,
    lng: Number
  },
  imagePath: { type: String },
  audioPath: { type: String }, // Added this field
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

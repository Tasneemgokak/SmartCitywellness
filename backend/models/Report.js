const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  email: { type: String, required: false },
  issue: { type: String, required: true },
  prediction: { type: String },
  severity: { type: String },
  location: {
    lat: Number,
    lng: Number
  },
  imagePath: { type: String },
  audioPath: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

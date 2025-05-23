const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);

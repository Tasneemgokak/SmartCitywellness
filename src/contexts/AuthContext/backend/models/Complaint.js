const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: String,
  message: String,
  reportId: String, // optional: to link to a report
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);

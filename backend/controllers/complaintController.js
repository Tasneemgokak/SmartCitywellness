const { v4: uuidv4 } = require('uuid');
const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { name, email, subject, description } = req.body;

    if (!name || !email || !subject || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const complaintId = uuidv4();

    const newComplaint = new Complaint({
      complaintId,
      name,
      email,
      subject,
      description
    });

    await newComplaint.save();

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaintId
    });
  } catch (err) {
    console.error('Complaint creation error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

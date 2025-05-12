const Complaint = require('../models/Complaint');

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { userId, message, reportId } = req.body;

    const newComplaint = new Complaint({
      userId,
      message,
      reportId
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint', error });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaint', error });
  }
};

// Delete complaint by ID
const deleteComplaint = async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json({ message: 'Complaint deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  deleteComplaint
};

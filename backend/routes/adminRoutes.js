// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
// const admin = require("../Admin/setAdminClaim");
const Feedback = require("../models/Feedback");
const Complaint = require("../models/Complaint");
const Report = require("../models/Report");
const admin = require("../config/firebaseAdmin");

// Middleware to check admin
const checkAdmin = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (!idToken) return res.status(401).json({ error: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.admin) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Get all feedback
router.get("/feedback", checkAdmin, async (req, res) => {
  const feedback = await Feedback.find();
  res.json(feedback);
});

// Get feedback by UID
router.get("/feedback/:feedbackId", checkAdmin, async (req, res) => {
  const fb = await Feedback.findOne({ feedbackId: req.params.feedbackId });
 if (!fb) {
    console.log("Feedback not found for ID:", req.params.feedbackId);
    return res.status(404).json({ error: "Not found" });
  }
  res.json(fb);
});


// Get all complaints
router.get("/complaints", checkAdmin, async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Get complaint by UID
router.get("/complaints/:complaintId", checkAdmin, async (req, res) => {
  const comp = await Complaint.findOne({ complaintId: req.params.complaintId });
  if (!comp) return res.status(404).json({ error: "Not found" });
  res.json(comp);
});

// Get all reports
router.get("/reports", checkAdmin, async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

// Get report by UID
router.get("/reports/:reportId", checkAdmin, async (req, res) => {
  const rep = await Report.findOne({ reportId: req.params.reportId });
  if (!rep) return res.status(404).json({ error: "Not found" });
  res.json(rep);
});


module.exports = router;

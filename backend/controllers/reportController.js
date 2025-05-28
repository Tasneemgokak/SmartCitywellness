const { v4: uuidv4 } = require('uuid');
const Report = require('../models/Report');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.createReport = async (req, res) => {
  try {
    const { userId, location, issue, email } = req.body;
    const reportId = uuidv4();

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Image is required.' });
    }

    const imagePath = `uploads/${req.files.image[0].filename}`;
    const audioPath = req.files.audio ? `uploads/${req.files.audio[0].filename}` : null;

    let severity = "Unknown";
    let prediction = "Unknown";

    try {
      // Send image to ML model
      const formData = new FormData();
      formData.append('file', fs.createReadStream(imagePath));

      const response = await axios.post('http://127.0.0.1:5001/predict', formData, {
        headers: formData.getHeaders(),
      });

      if (response.data && response.data.prediction) {
        prediction = response.data.prediction;
        severity = response.data.severity || "Unknown";
      }
    } catch (err) {
      console.error('ML model error:', err.message);
    }

    const newReport = new Report({
      reportId,
      userId,
      email,
      issue,
      severity,
      prediction,
      location: location ? JSON.parse(location) : undefined,
      imagePath,
      audioPath,
      createdAt: new Date()
    });

    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully', prediction , newReport});

  } catch (error) {
    console.error("Report submission failed:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

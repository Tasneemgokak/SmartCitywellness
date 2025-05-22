const { v4: uuidv4 } = require('uuid');
const Report = require('../models/Report');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.createReport = async (req, res) => {
  try {
    const { userId, location, issue } = req.body;
    const reportId = uuidv4();

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Image is required.' });
    }

    const imagePath = req.files.image[0].path;
    const audioPath = req.files.audio ? req.files.audio[0].path : null; // optional

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
      issue,
      severity,
      prediction,
      location,
      imagePath,
      audioPath
    });

    await newReport.save();

    res.status(201).json({
      message: 'Report created successfully',
      reportId,
      severity,
      prediction
    });

  } catch (err) {
    console.error('Report creation failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

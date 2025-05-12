const Report = require('../models/Report');
const axios = require('axios');
const fs = require('fs');

exports.createReport = async (req, res) => {
  try {
    const { userId, location } = req.body;
    const imagePath = req.file.path;

    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

    const response = await axios.post('http://127.0.0.1:5001/predict', {
      image: imageBase64
    });

    const { severity } = response.data;

    const newReport = new Report({
      userId,
      severity,
      location,
      imagePath
    });

    await newReport.save();
    res.status(201).json({ message: 'Report created successfully', severity });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { userId, rating, review } = req.body;
    const imageBefore = req.files['imageBefore'][0].path;
    const imageAfter = req.files['imageAfter'][0].path;

    const feedback = new Feedback({
      userId,
      rating,
      review,
      imageBefore,
      imageAfter
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

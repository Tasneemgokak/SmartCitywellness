const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/db');

const reportRoutes = require('./routes/reportRoute');
const feedbackRoutes = require('./routes/feedbackRoutes');
const complaintRoutes = require('./routes/complaintRoute');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const baseUrl = process.env.REACT_APP_API_URL2;

// Middleware
app.use(cors());

app.use(cors({
  origin: ["http://localhost:3000", `${baseUrl}`],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route Mounting
app.use('/api/reports', reportRoutes);      
app.use('/api/feedbacks', feedbackRoutes); 
app.use('/api/complaints', complaintRoutes); 
app.use('/api/admin', adminRoutes);

// Check if server is running
app.get('/', (req, res) => {
  res.send('Backend is running. Try POSTing to /api/reports');
});

const API_URL = process.env.REACT_APP_API_URL;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${API_URL || `http://localhost:${PORT}`}`);
});

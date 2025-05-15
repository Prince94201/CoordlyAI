const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');
const initializeDatabase = require('./models');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    console.log('Database initialized with schema and sample data.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
  });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ensure cors is installed
const { sequelize } = require('./models');  // Correct way to import sequelize
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');

const app = express();

// Initialize Sequelize
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

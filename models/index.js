// models/index.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Import models after sequelize initialization
const User = require('./user');
const Note = require('./note');

// Define associations if needed
User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

// Authenticate Sequelize instance
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

// Export sequelize instance and models
module.exports = { sequelize, User, Note };

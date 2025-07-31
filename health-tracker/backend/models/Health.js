const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  date: String,
  steps: String,
  calories: String,
  water: String,
  sleep: String
});

module.exports = mongoose.model('Health', healthSchema);

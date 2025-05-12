const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rollNo: Number,
  name: String,
  div: Number,
  class: String,
  leetcodeId: String,
  easySolved: Number,
  mediumSolved: Number,
  hardSolved: Number,
  totalSolved: Number,
  lastUpdated: Date,
  // Weekly tracking fields
  thisWeek: { type: Number, default: 0 },
  lastWeek: { type: Number, default: 0 },
  lastToLastWeek: { type: Number, default: 0 },
  totalSolvedStartOfWeek: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);

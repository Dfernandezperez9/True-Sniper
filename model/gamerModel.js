const mongoose = require('mongoose');

const gamerSchema = new mongoose.Schema({
  nickname: String,
  score: Number,
  level: Number,
  timestamp: Date
});

const gamer = mongoose.model('gamer', gamerSchema);

module.exports = gamer;
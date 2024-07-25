const mongoose = require('mongoose');
const db = require("../config/DBconfig");



const { Schema } = mongoose;

const rewardSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const RewardsModel = db.model('Reward', rewardSchema);
module.exports = RewardsModel;

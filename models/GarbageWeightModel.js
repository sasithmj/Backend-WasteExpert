const mongoose = require('mongoose');
const db = require("../config/DBconfig");



const { Schema } = mongoose;

const garbageWeightSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  wasteType: { 
    type: String, 
    required: true 
  },
  rewardPoints: { 
    type: Number, 
    required: true 
  },
  rewardId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Reward', 
    required: true 
  },
  withdrawnRewards: { 
    type: Number, 
    required: true 
  },
});

const GarbageWeightModel = db.model('GarbageWeight', garbageWeightSchema);
module.exports = GarbageWeightModel;

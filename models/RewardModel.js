const mongoose = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoose;

const rewardSchema = new Schema({
  rewardID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  rewardType: {
    type: String,
    required: true,
  },
  pointsRequired: {
    type: Number,
    required: true,
  },
  
});

const RewardModel = db.model("reward", rewardSchema);
module.exports = RewardModel;

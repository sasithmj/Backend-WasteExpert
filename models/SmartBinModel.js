const mongoose = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoose;

const smartBinSchema = new Schema({
  binID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  fillLevel: {
    type: Number,
    required: true,
  },
});

const SmartBinModel = db.model("smartBin", smartBinSchema);
module.exports = SmartBinModel;

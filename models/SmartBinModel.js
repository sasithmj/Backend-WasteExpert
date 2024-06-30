const mongoose = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoose;

const smartBinSchema = new Schema({
  
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

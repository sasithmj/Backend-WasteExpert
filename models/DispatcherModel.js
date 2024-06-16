const mongoose = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoose;

const dispatcherSchema = new Schema({
  dispatcherID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other properties specific to Dispatcher as per your requirements
});

const DispatcherModel = db.model("dispatcher", dispatcherSchema);
module.exports = DispatcherModel;

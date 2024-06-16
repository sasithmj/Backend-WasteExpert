const mongoose = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoose;

const garbageCollectorSchema = new Schema({
  collectorID: {
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
  
});

const GarbageCollectorModel = db.model("garbageCollector", garbageCollectorSchema);
module.exports = GarbageCollectorModel;

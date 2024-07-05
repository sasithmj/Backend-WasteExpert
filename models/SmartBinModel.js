const db = require("../config/DBconfig");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const smartBinSchema = new Schema({
  area: {
    type: String,
    required: true,
  },
  locationLat: {
    type: Number,
    required: true,
  },
  locationLng: {
    type: Number,
    required: true,
  },
  garbageTypes: {
    type: String,
    required: true,
  },
  fillLevel: { // Added the new property
    type: String,
    required: false, // Adjust as needed (required/optional)
  },
});

smartBinSchema.pre("save", async function () {
  try {
    var pickupSchedule = this;
  } catch (error) {}
});

const SmartBinModel = db.model("smartBin", smartBinSchema);
module.exports = SmartBinModel;

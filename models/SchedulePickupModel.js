const db = require("../config/DBconfig");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const schedulePickupSchema = new Schema({
  area: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "GarbageCollector", // Assuming you have a GarbageCollector model
    required: true,
  },
  garbageTypes: {
    type: String,
    // type: [garbageTypeSchema],
    required: true,
  },
  Status: {
    type: String,
    // type: [garbageTypeSchema],
    default:'pending',
  },
});
schedulePickupSchema.pre("save", async function () {
  try {
    var pickupSchedule = this;
  } catch (error) {}
});

const SchedulePickupModel = db.model("schedulePickup", schedulePickupSchema);
module.exports = SchedulePickupModel;

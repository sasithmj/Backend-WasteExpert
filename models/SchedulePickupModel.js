const mongoose = require('mongoose');

const garbageTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

const schedulePickupSchema = new mongoose.Schema({
  scheduleID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
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
});

const SchedulePickupModel = mongoose.model("schedulePickup", schedulePickupSchema);

module.exports = SchedulePickupModel;

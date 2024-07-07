const mongoose = require("mongoose");
const db = require("../config/DBconfig");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const wasteTypeSchema = new Schema({
  wastetype: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const wasteScheduleSchema = new Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  WasteType: {
    type: [wasteTypeSchema],
    required: true,
  },
  ScheduledDate: {
    type: Date,
    required: true,
  },

  ScheduleState: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
});

wasteScheduleSchema.pre("save", async function () {
  try {
    var wasteSchedule = this;
  } catch (error) {}
});

const WasteScheduleModel = db.model(
  "WasteCollectionSchedule",
  wasteScheduleSchema
);
module.exports = WasteScheduleModel;

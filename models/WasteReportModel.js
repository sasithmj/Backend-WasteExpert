const mongoose = require("mongoose");
const db = require("../config/DBconfig");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const wasteReportSchema = new Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Photo: {
    type: Buffer,
    required: false,
  },
  locationLat: {
    type: Number,
    required: true,
  },
  locationLng: {
    type: Number,
    required: true,
  },
  ReportDate: {
    type: Date,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  WasteTypes: {
    type: [String],
    required: true,
  },
});

wasteReportSchema.pre("save", async function () {

  try {
    var wasteSchedule = this;
  } catch (error) {}
});

const WasteReportModel = db.model("WasteReports", wasteReportSchema);
module.exports = WasteReportModel;

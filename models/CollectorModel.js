const db = require("../config/DBconfig");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Dependency for password hashing

const { Schema } = mongoose;

const collectorSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures unique usernames
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique emails
  },
  vehicalNo: {
    type: String,
    required: true,
  },
});

// Hash password before saving
collectorSchema.pre("save", async function (next) {
  const collector = this;
  if (!collector.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  collector.password = await bcrypt.hash(collector.password, salt);
  next();
});

const CollectorModel = db.model("Collector", collectorSchema);
module.exports = CollectorModel;

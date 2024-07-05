const db = require("../config/DBconfig");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Dependency for password hashing

const { Schema } = mongoose;

const dispatcherSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true, // Ensures unique usernames
  },
  password: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique emails
  },
});

// Hash password before saving
dispatcherSchema.pre("save", async function (next) {
  const dispatcher = this;
  if (!dispatcher.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  dispatcher.password = await bcrypt.hash(dispatcher.password, salt);
  next();
});

const DispatcherModel = db.model("Dispatcher", dispatcherSchema);
module.exports = DispatcherModel;

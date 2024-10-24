const db = require("../config/DBconfig");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Dependency for password hashing

const { Schema } = mongoose;

const dispatcherSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: false, // Ensures unique usernames
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
});

// Hash password before saving
dispatcherSchema.pre("save", async function () {
  const dispatcher = this;
  if (!dispatcher.isModified("password"));

  const salt = await bcrypt.genSalt(10);
  dispatcher.password = await bcrypt.hash(dispatcher.password, salt);
  
});

const DispatcherModel = db.model("Dispatcher", dispatcherSchema);
module.exports = DispatcherModel;

const mongoose = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoose;

const adminSchema = new Schema({
  adminID: {
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

const AdminModel = db.model("admin", adminSchema);
module.exports = AdminModel;

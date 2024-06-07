const mongoos = require("mongoose");
const db = require("../config/DBconfig");

const { Schema } = mongoos;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = db.model("user", userSchema);
module.exports = UserModel;

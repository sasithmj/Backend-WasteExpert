const mongoos = require("mongoose");
const db = require("../config/DBconfig");
const bcrypt = require("bcrypt");

const { Schema } = mongoos;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpaswword = await bcrypt.hash(user.password, salt);
    user.password = hashpaswword;
  } catch (error) {}
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {}
};

const UserModel = db.model("user", userSchema);
module.exports = UserModel;

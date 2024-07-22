const mongoos = require("mongoose");
const db = require("../config/DBconfig");
const bcrypt = require("bcrypt");

const { Schema } = mongoos;
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
const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

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
  location: {
    type: locationSchema,
    required: false,
  },
  address: {
    type: addressSchema,
    required: false,
  },
  profilepicture: {
    type: Buffer,
    required: false,
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
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
};

const UserModel = db.model("user", userSchema);
module.exports = UserModel;

const mongoose = require("mongoose");
const db = require("../config/DBconfig");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    default:'',
  },
  address: {
    type: String,
    default:'',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default:'',
  },
  phoneNum: {
    type: String,
    default:'',
    unique: true,
  },
  
  jobs: {
    type: String,
    default:'',
  },

});

// Pre-save hook to hash the password
adminSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpaswword = await bcrypt.hash(user.password, salt);
    user.password = hashpaswword;
  } catch (error) {}
});

adminSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {}
};

const AdminModel = db.model("admin", adminSchema);
module.exports = AdminModel;

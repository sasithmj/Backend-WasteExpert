// AdminController.js

const AdminService = require("../services/AdminService");
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const successRes = await AdminService.registerAdmin(username, email, password);

    if (successRes.success) {
      res.status(201).json({ status: true, message: successRes.message });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminService.checkAdmin(email);
    if (!admin) {
      return res.status(401).json({ status: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password); // Corrected
    if (!isMatch) {
      return res.status(401).json({ status: false, error: "Invalid email or password" });
    }

    const tokenData = { _id: admin._id, email: admin.email, username: admin.username };
    const token = await AdminService.generateToken(tokenData, "secretkey", "1h");

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }

};

exports.addAdmin = async (req, res, next) => {
  console.log("addAdmin function invoked");

  try {
    const { userName, password, role, phoneNum, email, jobs } = req.body.formData;
    console.log("Request Body:", req.body);

    const newAdmin = await AdminService.addAdmin({
      userName,
      password,
      role,
      phoneNum,
      email,
      jobs,
    });

    console.log("Service Response:", newAdmin);

    if (newAdmin.success) {
      console.log("Success: New Admin added successfully");
      return res
        .status(201)
        .json({ status: true, success: newAdmin.message });
    } else {
      console.error("Error: Adding new Admin failed:", newAdmin.message);
      return res
        .status(400)
        .json({ status: false, error: newAdmin.message });
    }
  } catch (error) {
    console.error("Error in addAdmin controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

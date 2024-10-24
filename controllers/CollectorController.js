const CollectorService = require("../services/CollectorService");
const User = require('../models/Usermodel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginCollector = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the collector exists
    const collector = await CollectorService.checkCollector(email);
    if (!collector) {
      return res
        .status(401)
        .json({ status: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, collector.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, error: "Invalid username or password" });
    }

    const tokenData = {
      _id: collector._id,
      email: collector.email,
      userType: "collector", // Adjust as needed
    };
    const token = jwt.sign(tokenData, "secretkey", { expiresIn: "1h" }); // Use the same secret and expiry

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.addCollector = async (req, res, next) => {
  console.log("addCollector function invoked");

  try {
    const { username, password, fullName, address, phoneNum, email, vehicalNo } = req.body;
    console.log("Request Body:", req.body);

    const newCollector = await CollectorService.addCollector({
      username,
      password,
      fullName,
      address,
      phoneNum,
      email,
      vehicalNo,
    });

    console.log("Service Response:", newCollector);

    if (newCollector.success) {
      console.log("Success: New Collector added successfully");
      return res
        .status(201)
        .json({ status: true, success: newCollector.message });
    } else {
      console.error("Error: Adding new Collector failed:", newCollector.message);
      return res
        .status(400)
        .json({ status: false, error: newCollector.message });
    }
  } catch (error) {
    console.error("Error in addCollector controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.getAllCol = async (req, res, next) => {
  try {
    const { _id, username, fullName, address, phoneNum, email, vehicalNo } =
      req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await CollectorService.getAllCol(
      _id,
      username,
      fullName,
      address,
      phoneNum,
      email,
      vehicalNo
    );
    // Log the success response
    console.log("Success Response:", successRes);

    if (successRes.success) {
      res.status(201).json({
        status: true,
        collectors: successRes.collectors,
      });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.addGarbageWeight = async (req, res, next) => {
  try {
    const { wasteList, userId, scheduleId } = req.body;

    if (!userId) {
      return res.status(400).json({ status: false, error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, error: 'User not found' });
    }

    if (!Array.isArray(wasteList)) {
      return res.status(400).json({ status: false, error: 'wasteList must be an array' });
    }

    const successRes = await CollectorService.addGarbageWeight(userId, wasteList, scheduleId);

    if (successRes.success) {
      res.status(201).json({
        status: true,
        message: successRes.message,
      });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error('Error adding garbage weight:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};

exports.deleteCollector = async (req, res, next) => {
  try {

    const {_id} = req.body;
    console.log("Request Body:", req.body);

    const successRes = await CollectorService.deleteCollector(_id);

    if (successRes.success) {
      return res.status(200).json({ status: true, message: successRes.message });
    } else {
      return res.status(404).json({ status: false, message: successRes.message });
    }
  } catch (error) {
    console.error("Error deleting collector:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

exports.updateCollector = async (req, res, next) => {
  try {
    const { _id, fullName, address, phoneNum, email, vehicalNo } = req.body;

    const successRes = await CollectorService.updateCollector(_id, {
      fullName,
      address,
      phoneNum,
      email,
      vehicalNo
    });

    if (successRes.success) {
      return res.status(200).json({ status: true, message: successRes.message, collector: successRes.collector });
    } else {
      return res.status(404).json({ status: false, message: successRes.message });
    }
  } catch (error) {
    console.error("Error updating collector:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

exports.updateCollectorbyUser = async (req, res, next) => {
  try {
    const { _id, fullName, address, phoneNum, email, vehicalNo } = req.body;

    const successRes = await CollectorService.updateCollectorbyUser(_id, {
      fullName,
      address,
      phoneNum,
      email,
      vehicalNo
    });

    if (successRes.success) {
      return res.status(200).json({ status: true, message: successRes.message, collector: successRes.collector });
    } else {
      return res.status(404).json({ status: false, message: successRes.message });
    }
  } catch (error) {
    console.error("Error updating:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { _id, oldPassword, newPassword } = req.body;

    const collector = await CollectorService.checkCollectorById(_id); // Fetch collector by ID
    if (!collector) {
      return res
        .status(404)
        .json({ status: false, message: "Collector not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, collector.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Old password is incorrect" });
    }

    const updatedCollector = await CollectorService.changeCollectorPassword(
      _id,
      newPassword
    );
    if (updatedCollector.success) {
      return res
        .status(200)
        .json({ status: true, message: "Password changed successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: updatedCollector.message });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

exports.getCollectorDetails = async (req, res, next) => {
  try {
    const { id } = req.body; // Get ID from the request body
    const successRes = await CollectorService.getCollectorById(id);

    if (successRes.success) {
      res.status(200).json({ status: true, user: successRes.user });
    } else {
      res.status(404).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};



const UserService = require("../services/UserService");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;

    const successRes = await UserService.registerUser(
      name,
      email,
      password,
      mobile
    );

    // Log the response from the UserService.registerUser method
    console.log("Success Response:", successRes);

    // Handle the response based on the successRes
    if (successRes.success) {
      res.status(201).json({ status: true, success: successRes.message });
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

    // Check if user exists
    const user = await UserService.checkUser(email);
    if (!user) {
      // Log detailed error for internal use
      console.error("Login Error: User not found");

      // Send generic error response
      return res
        .status(401)
        .json({ status: false, error: "Invalid email or password" });
    }

    console.log(user);

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Log detailed error for internal use
      console.error("Login Error: Invalid password");

      // Send generic error response
      return res
        .status(401)
        .json({ status: false, error: "Invalid email or password" });
    }

    // Generate token
    let tokenData = { _id: user._id, email: user.email, name: user.name };
    const token = await UserService.genarateToken(
      tokenData,
      "secretkey",
      "120h"
    );

    // Send successful response
    res.status(200).json({ status: true, token: token });
  } catch (error) {
    // Log the error details
    console.error("Login Error:", error);

    // Send internal server error response
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { email, lat, lng } = req.body;

    // Check if user exists
    const user = await UserService.checkUser(email);
    if (!user) {
      // Log detailed error for internal use
      console.error("Update Location Error: User not found");

      // Send generic error response
      return res.status(401).json({ status: false, error: "Invalid User" });
    }

    // Update the location
    const successRes = await UserService.updateUserLocation(email, lat, lng);

    // Handle the response based on the successRes
    if (successRes.success) {
      res.status(200).json({ status: true, success: successRes.message });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    // Log the error details
    console.error("Update Location Error:", error);

    // Send internal server error response
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
exports.updateAddress = async (req, res, next) => {
  try {
    const { email, street, city, state, zip, latitude, longitude } = req.body;

    // Check if user exists
    const user = await UserService.checkUser(email);
    if (!user) {
      // Log detailed error for internal use
      console.error("Update Address Error: User not found");

      // Send generic error response
      return res.status(401).json({ status: false, error: "Invalid User" });
    }

    // Update the location
    const successRes = await UserService.UpdateUserAddress(
      email,
      street,
      city,
      state,
      zip,
      latitude,
      longitude
    );

    // Handle the response based on the successRes
    if (successRes.success) {
      res.status(200).json({ status: true, success: successRes.message });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    // Log the error details
    console.error("Update Address Error:", error);

    // Send internal server error response
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const { email } = req.body;
    const successRes = await UserService.getUserById(email);

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

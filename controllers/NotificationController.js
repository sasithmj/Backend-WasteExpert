const NotificationService = require("../services/NotificationService");
const UserService = require("../services/UserService");

exports.sendNotification = async (req, res, next) => {
  try {
    const { token, title, body } = req.body;

    const successRes = await NotificationService.sendNotification(
      token,
      title,
      body
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

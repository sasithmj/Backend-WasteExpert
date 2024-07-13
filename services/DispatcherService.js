const Dispatcher = require("../models/DispatcherModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class DispatcherService {


  static async dispatcherLogin(email, password) {
    try {
      // Check if dispatcher exists
      const dispatcher = await Dispatcher.findOne({ email });
      if (!dispatcher) {
        return { success: false, error: "Invalid email or password" };
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, dispatcher.password);
      if (!isMatch) {
        return { success: false, error: "Invalid email or password" };
      }

      // Generate token
      const token = jwt.sign(
        { _id: dispatcher._id, email: dispatcher.email },
        "secretkey",
        { expiresIn: "120h" }
      );

      return { success: true, token };
    } catch (error) {
      console.error("Error in DispatcherService.dispatcherLogin:", error);
      return { success: false, error: "Internal Server Error" };
    }
  }

  
  static async addDispatcher(dispatcherData) {
    try {
      console.log(dispatcherData)
      const newDispatcher = new Dispatcher(dispatcherData);
      await newDispatcher.save();
      return {
        success: true,
        message: "Added New Dispatcher successfully",
      };
    } catch (error) {
      console.error("Error in DispatcherService.addDispatcher:", error);
      return {
        success: false,
        message: "Error Adding New Dispatcher",
      };
    }
  }
}

module.exports = DispatcherService;

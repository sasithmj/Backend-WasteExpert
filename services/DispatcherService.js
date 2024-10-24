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
        { _id: dispatcher._id, email: dispatcher.email, userType: "dispatcher" },
        "secretkey",
        { expiresIn: "120h" }
      );

      return { success: true, token };
    } catch (error) {
      console.error("Error in DispatcherService.dispatcherLogin:", error);
      return { success: false, error: "Internal Server Error" };
    }
  }
  static async checkDispatcher(email) {
    try {
      const existingDispatcher = await Dispatcher.findOne({ email });
      return existingDispatcher; // Returns dispatcher if found, or null if not found
    } catch (error) {
      console.error("Error in DispatcherService.checkDispatcher:", error);
      throw error; // Propagate the error to the controller
    }
  }

  static async addDispatcher(dispatcherData) {
    try {
      console.log(dispatcherData);
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

  static async getAllDis() {
    try {
      const dispatchers = await Dispatcher.find({});
      if (!dispatchers) {
        return { success: false, message: "No Dispatcher found" };
      }

      return {
        success: true,
        dispatchers: dispatchers.map((dispatcher) => ({
          _id: dispatcher._id,
          username: dispatcher.username,
          fullName: dispatcher.fullName,
          address: dispatcher.address,
          phoneNum: dispatcher.phoneNum,
          email: dispatcher.email,
        })),
      };
    } catch (error) {
      console.error("Error while fetching Dispatcher details:", error);
      throw new Error("Error while fetching smaDispatcherrtbin details");
    }
  }

  static async deleteDispatcher(_id) {
    try {
      const deletedDispatcher = await Dispatcher.findByIdAndDelete(_id);

      if (!deletedDispatcher) {
        return { success: false, message: "Dispatcher not found" };
      }

      return { success: true, message: "Dispatcher deleted successfully" };
    } catch (error) {
      console.error("Error while deleting dispatcher:", error);
      throw new Error("Error while deleting dispatcher");
    }
  }

  static async updateDispatcher(_id, updateData) {
    try {
      const { fullName, address, phoneNum, email } = updateData;
  
      // Only update the fields that are provided
      const updatedDispatcher = await Dispatcher.findByIdAndUpdate(
        _id,
        { fullName, address, phoneNum, email },
        { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation is applied
      );
  
      if (!updatedDispatcher) {
        return { success: false, message: "Dispatcher not found" };
      }
  
      return { success: true, message: "Dispatcher updated successfully", dispatcher: updatedDispatcher };
    } catch (error) {
      console.error("Error while updating dispatcher:", error);
      return { success: false, message: "Error updating dispatcher" };
    }
  }

  static async updateDispatcherbyUser(_id, updateData) {
    try {
      const { fullName, address, phoneNum, email } = updateData;
  
      // Only update the fields that are provided
      const updatedDispatcher = await Dispatcher.findByIdAndUpdate(
        _id,
        { fullName, address, phoneNum, email },
        { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation is applied
      );
  
      if (!updatedDispatcher) {
        return { success: false, message: "Dispatcher not found" };
      }
  
      return { success: true, message: "Dispatcher updated successfully", dispatcher: updatedDispatcher };
    } catch (error) {
      console.error("Error while updating dispatcher:", error);
      return { success: false, message: "Error updating dispatcher" };
    }
  }

  static async checkDispatcherById(_id) {
    try {
      const dispatcher = await Dispatcher.findById(_id);
      return dispatcher; // Returns dispatcher document or null if not found
    } catch (error) {
      console.error("Error while checking dispatcher by ID:", error);
      throw error; // Propagate the error up the call stack
    }
  }

  static async changeDispatcherPassword(_id, newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedDispatcher = await Dispatcher.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );

      if (!updatedDispatcher) {
        return { success: false, message: "Dispatcher not found" };
      }

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, message: "Error updating password" };
    }
  }

  static async getDispatcherById(id) {
    try {
      const dispatcher = await Dispatcher.findById(id).select("-password"); // Exclude the password field
      if (!dispatcher) {
        return { success: false, message: "Dispatcher not found" };
      }
      return { success: true, user: dispatcher };
    } catch (error) {
      console.error("Error while fetching dispatcher details:", error);
      throw new Error("Error while fetching dispatcher details");
    }
  }
}


module.exports = DispatcherService;

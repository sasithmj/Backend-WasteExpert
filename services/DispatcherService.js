const Dispatcher = require("../models/DispatcherModel");

class DispatcherService {
  static async addDispatcher(dispatcherData) {
    try {
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

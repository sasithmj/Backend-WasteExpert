const SmartBin = require("../models/SmartBinModel");

class SmartBinService {
  static async addNewSmartBin(area, locationLat, locationLng, garbageTypes, fillLevel) {
    try {
      const newSmartBin = new SmartBin({
        area,
        locationLat,
        locationLng,
        garbageTypes,
        fillLevel,
      });
      await newSmartBin.save();
      return {
        success: true,
        message: "Added New SmartBin successfully",
      };
    } catch (error) {
      console.error("Error in SmartBinService.addNewSmartBin:", error);
      return {
        success: false,
        message: "Error Adding New Schedule",
      };
    }
  }
}

module.exports = SmartBinService;

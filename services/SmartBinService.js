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

  static async getSmartBin() {
    try {
      const smartbins = await SmartBin.find({});
      if (!smartbins) {
        return { success: false, message: "No Smartbin found" };
      }

      return {
        success: true,
        smartbins: smartbins.map((smartbin) => ({
          // Include desired properties from smartbin object
          area: smartbin.area,
          locationLat: smartbin.locationLat,
          locationLng: smartbin.locationLng,
          garbageTypes: smartbin.garbageTypes,
          fillLevel: smartbin.fillLevel,
        })),
      };

    } catch (error) {
      console.error("Error while fetching smartbin details:", error);
      throw new Error("Error while fetching smartbin details");
    }
  }
}

module.exports = SmartBinService;

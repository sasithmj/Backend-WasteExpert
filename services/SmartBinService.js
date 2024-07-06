const SmartBin = require("../models/SmartBinModel");
const haversine = require("haversine-distance");

class SmartBinService {
  static async addNewSmartBin(
    area,
    locationLat,
    locationLng,
    garbageTypes,
    fillLevel
  ) {
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

  static async getNearbySmartBins(userLat, userLng, radius) {
    try {
      const smartBins = await SmartBin.find({});
      console.log(smartBins);
      const nearbyBins = smartBins.filter((bin) => {
        const binLocation = { lat: bin.locationLat, lng: bin.locationLng };
        const userLocation = { lat: userLat, lng: userLng };
        const distance = haversine(binLocation, userLocation);
        console.log(distance); // Distance in meters
        return distance <= radius; // Filter bins within the specified radius
      });
      return {
        success: true,
        bins: nearbyBins,
      };
    } catch (error) {
      console.error("Error in SmartBinService.getNearbySmartBins:", error);
      return {
        success: false,
        message: "Error fetching nearby smart bins",
      };
    }
  }
}

module.exports = SmartBinService;

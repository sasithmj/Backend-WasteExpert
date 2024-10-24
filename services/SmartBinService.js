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
          id: smartbin._id,
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

  static async getNearbySmartBins(userLat, userLng, radius) {
    try {
      const smartBins = await SmartBin.find({});

      const nearbyBins = smartBins.filter((bin) => {
        const binLocation = { lat: bin.locationLat, lng: bin.locationLng };
        const userLocation = { lat: userLat, lng: userLng };
        const distance = haversine(binLocation, userLocation);
        console.log(distance); // Distance in meters
        return distance <= radius; // Filter bins within the specified radius
      });
      console.log(nearbyBins);
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

  static async updateFillLevel(binId, newFillLevel) {
    try {
      const updatedBin = await SmartBin.findByIdAndUpdate(
        binId,
        { fillLevel: newFillLevel },
        { new: true, runValidators: true }
      );

      if (!updatedBin) {
        return {
          success: false,
          message: "Smart bin not found",
        };
      }

      return {
        success: true,
        message: "Fill level updated successfully",
        updatedBin: {
          id: updatedBin._id,
          area: updatedBin.area,
          locationLat: updatedBin.locationLat,
          locationLng: updatedBin.locationLng,
          garbageTypes: updatedBin.garbageTypes,
          fillLevel: updatedBin.fillLevel,
        },
      };
    } catch (error) {
      console.error("Error in SmartBinService.updateFillLevel:", error);
      return {
        success: false,
        message: "Error updating fill level",
      };
    }
  }
}

module.exports = SmartBinService;

const SchedulePickup = require("../models/SchedulePickupModel");

class SchedulePickupService {
  static async addSchedulePickup(area, date, collector, garbageTypes) {
    try {
      const newSchedulePickup = new SchedulePickup({
        area,
        date,
        collector,
        garbageTypes,
      });
      await newSchedulePickup.save();
      return {
        success: true,
        message: "Added New Schedule Pickup successfully",
      };
    } catch (error) {
      console.error("Error in SchedulePickupService.addSchedulePickup:", error);
      return {
        success: false,
        message: "Error Adding New Schedule",
      };
    }
  }

  static async getSmartBin() {
    try {
      const shedulepickups = await SchedulePickup.find({});
      if (!shedulepickups) {
        return { success: false, message: "No Smartbin found" };
      }

      return {
        success: true,
        shedulepickups: shedulepickups.map((shedulepickup) => ({
          // Include desired properties from smartbin object
          area: shedulepickup.area, 
          date: shedulepickup.date, 
          collector: shedulepickup.collector, 
          garbageTypes: shedulepickup.garbageTypes, 
          Status: shedulepickup.Status
        })),
      };

    } catch (error) {
      console.error("Error while fetching smartbin details:", error);
      throw new Error("Error while fetching smartbin details");
    }
  }
}

module.exports = SchedulePickupService;

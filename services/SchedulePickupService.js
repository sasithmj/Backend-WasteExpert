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
}

module.exports = SchedulePickupService;

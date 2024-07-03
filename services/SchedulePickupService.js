const SchedulePickup = require('../models/SchedulePickupModel'); // Import model

class SchedulePickupService {
  static async addSchedulePickup(area, date, collector, garbageTypes) {
    try {
      const newSchedulePickup = new SchedulePickup({ area, date, collector, garbageTypes });
      await newSchedulePickup.save();
      return { success: true, message: "Add New Schedule Pickupd successfully" };
    } catch (error) {
      throw new Error("Error Add New Schedule");
    }
  }
}

module.exports = SchedulePickupService;

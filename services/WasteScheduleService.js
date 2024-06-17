const WasteSchedule = require("../models/WasteScheduleModel");

class WasteScheduleService {
  static async scheduleWaste(UserId, WasteType, ScheduledDate, Location) {
    try {
      // Log the data before saving
      console.log("Data to be saved in WasteScheduleService:", {
        UserId,
        WasteType,
        ScheduledDate,
        Location,
      });

      const newSchedule = new WasteSchedule({
        UserId,
        WasteType,
        ScheduledDate,
        Location,
      });

      // Log the new schedule object before saving
      console.log("New Schedule Object:", newSchedule);

      await newSchedule.save();
      return { success: true, message: "New Schedule Placed" };
    } catch (error) {
      console.error("Error while saving waste schedule:", error);
      throw new Error(`Error while scheduling waste: ${error}`);
    }
  }
}

module.exports = WasteScheduleService;

const SchedulePickup = require("../models/SchedulePickupModel");

class SchedulePickupService {
  static async addSchedulePickup(area, date, collector, locations, quantity) {
    try {
      const newSchedulePickup = new SchedulePickup({
        area,
        date,
        collector,
        locations,
        quantity
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

  static async getSchedulePickup() {
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
          Status: shedulepickup.Status,
          locations: shedulepickup.locations,
          quantity: shedulepickup.quantity
        })),
      };

    } catch (error) {
      console.error("Error while fetching smartbin details:", error);
      throw new Error("Error while fetching smartbin details");
    }
  }
  
  static async getSchedulePickupToCollector({ collector }) {
    try {
      const schedulePickups = await SchedulePickup.find({ collector });
      if (!schedulePickups || schedulePickups.length === 0) {
        return { success: false, message: "No schedule pickups found" };
      }
  
      return {
        success: true,
        schedulePickups: schedulePickups.map((pickup) => ({
          area: pickup.area,
          date: pickup.date,
          collector: pickup.collector,
          status: pickup.status,
          locations: pickup.locations,
          quantity: pickup.quantity
        })),
      };
  
    } catch (error) {
      console.error("Error while fetching schedule pickups:", error);
      throw new Error("Error while fetching schedule pickups");
    }
  }
  
  
  


}




module.exports = SchedulePickupService;

const WasteSchedule = require("../models/WasteScheduleModel");
const User = require("../models/Usermodel");

class WasteScheduleService {
  static async scheduleWaste(UserId, WasteType, ScheduledDate, ScheduleState) {
    try {
      // Log the data before saving
      console.log("Data to be saved in WasteScheduleService:", {
        UserId,
        WasteType,
        ScheduledDate,
        ScheduleState,
      });

      const user = await User.findOne({ _id: UserId }).select("-password");

      const location = user.location;

      const newSchedule = new WasteSchedule({
        UserId,
        WasteType,
        ScheduledDate,
        ScheduleState,
        location,
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

  static async getScheduleWaste(UserId, ScheduleState) {
    try {
      const user = await User.findOne({ _id: UserId }).select("-password");

      if (!user) {
        return { success: false, message: "User not found" };
      }

      const schedules = await WasteSchedule.find({
        UserId: UserId,
        ScheduleState: ScheduleState,
      });
      if (!schedules) {
        return { success: false, message: "No schedules found" };
      }

      return { success: true, user: user, schedules: schedules };
    } catch (error) {
      console.error("Error while fetching user details:", error);
      throw new Error("Error while fetching user details");
    }
  }

  static async updateScheduleDate(scheduleId, scheduleDate) {
    try {
      // Find the user by email
      const schedule = await WasteSchedule.findOne({ _id: scheduleId });
      if (!schedule) {
        return { success: false, message: "schedule not found" };
      }

      // Update the user's location
      schedule.ScheduledDate = scheduleDate;
      await schedule.save();

      return { success: true, message: "Schedule updated successfully" };
    } catch (error) {
      throw new Error("Error while updating Schedule");
    }
  }

  static async updateScheduleState(id, date) {
    try {
      const schedule = await WasteSchedule.findOne({ _id: id });
      if (!schedule) {
        return { success: false, message: "schedule not found" };
      }

      // Update the schedule state
      schedule.ScheduleState = "Scheduled";
      schedule.ScheduledDate = date;
      await schedule.save();

      return { success: true, message: "Schedule updated successfully" };
    } catch (error) {
      throw new Error("Error while updating Schedule");
    }
  }

  static async updateScheduleStateToFinish(id, date, wasteTypes) {
    try {
      const schedule = await WasteSchedule.findOne({ _id: id });
      if (!schedule) {
        return { success: false, message: "Schedule not found" };
      }

      // Log the data being updated for debugging
      console.log("Updating schedule:", {
        id,
        date,
        wasteTypes
      });

      // Update the schedule state
      schedule.ScheduleState = "Completed";
      schedule.ScheduledDate = date;
      schedule.WasteType = wasteTypes;

      // Save the updated schedule
      await schedule.save();

      return { success: true, message: "Schedule updated successfully" };
    } catch (error) {
      console.error("Error while updating Schedule:", error.message);
      return { success: false, message: "Error while updating Schedule: " + error.message };
    }
  }




  static async deleteScheduleData(scheduleId) {
    try {
      // Find the user by email
      const deleteSchedule = await WasteSchedule.findOneAndDelete({
        _id: scheduleId,
      });
      if (!deleteSchedule) {
        return { success: false, message: "schedule not found" };
      }
      return { success: true, message: "Schedule deleted successfully" };
    } catch (error) {
      throw new Error("Error while updating Schedule");
    }
  }

  static async getAllScheduleWaste() {
    try {
      const allScheduleWaste = await WasteSchedule.find({ ScheduleState: "Waiting" });
      if (!allScheduleWaste) {
        return { success: false, message: "No Waste Schedule found" };
      }

      return {
        success: true,
        allScheduleWaste: allScheduleWaste.map((scheduleWaste) => ({
          // Include desired properties from smartbin object
          id: scheduleWaste.id,
          UserId: scheduleWaste.UserId,
          WasteType: scheduleWaste.WasteType,
          ScheduledDate: scheduleWaste.ScheduledDate,
          ScheduleState: scheduleWaste.ScheduleState,
          location: scheduleWaste.location
        })),
      };

    } catch (error) {
      console.error("Error while fetching Waste Schedule details:", error);
      throw new Error("Error while fetching Waste Schedule details");
    }
  }

}

module.exports = WasteScheduleService;

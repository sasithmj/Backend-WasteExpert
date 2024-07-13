const ReportSchedule = require("../models/WasteReportModel");
const User = require("../models/Usermodel");

class WasteReportService {
  static async reportWaste(
    UserId,
    Photo,
    locationLat,
    locationLng,
    ReportDate,
    Description,
    WasteTypes
  ) {
    try {

      console.log("Data to be saved in ReportService:", {
        UserId,
        Photo,
        locationLat,
        locationLng,
        ReportDate,
        Description,
        WasteTypes,
      });

      // console.log("Data to be saved in ReportService:", {
      //   UserId,
      //   Photo,
      //   locationLat,
      //   locationLng,
      //   ReportDate,
      //   Description,
      //   WasteTypes,
      // });


      const newReport = new ReportSchedule({
        UserId,
        Photo,
        locationLat,
        locationLng,
        ReportDate,
        Description,
        WasteTypes,
      });

      // Log the new schedule object before saving
      console.log("New Report Object:", newReport);

      await newReport.save();
      return { success: true, message: "New Report Placed" };
    } catch (error) {
      console.error("Error while saving waste Report:", error);
      throw new Error(`Error while Report waste: ${error}`);
    }
  }
}

module.exports = WasteReportService;

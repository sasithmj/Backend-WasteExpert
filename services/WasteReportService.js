const WasteReportModel = require("../models/WasteReportModel"); // Make sure the path is correct

class WasteReportService {
  static async reportWaste(
    UserId,
    photoPath,
    locationLat,
    locationLng,
    ReportDate,
    Description,
    WasteTypes
  ) {
    try {
      const newReport = new WasteReportModel({
        UserId,
        Photo: photoPath, // Save the path to the database
        locationLat,
        locationLng,
        ReportDate,
        Description,
        WasteTypes,
      });

      await newReport.save();
      return { success: true, message: "New Report Placed" };
    } catch (error) {
      console.error("Error while saving waste report:", error);
      throw new Error(`Error while reporting waste: ${error}`);
    }
  }

  static async getReportsByUserId(UserId) {
    try {
      const reports = await WasteReportModel.find({ UserId }).exec();
      return { success: true, data: reports };
    } catch (error) {
      console.error("Error while retrieving waste reports:", error);
      throw new Error(`Error while retrieving waste reports: ${error}`);
    }
  }
}

module.exports = WasteReportService;

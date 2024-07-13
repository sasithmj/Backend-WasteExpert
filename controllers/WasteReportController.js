const ScheduleService = require("../services/WasteReportService");

exports.reportWaste = async (req, res, next) => {
  try {
    const {
      UserId,
      Photo,
      locationLat,
      locationLng,
      ReportDate,
      Description,
      WasteTypes,
    } = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await ScheduleService.reportWaste(
      UserId,
      Photo,
      locationLat,
      locationLng,
      ReportDate,
      Description,
      WasteTypes
    );
    // Log the success response
    console.log("Success Response:", successRes);

    if (successRes.success) {
      res.status(201).json({ status: true, success: successRes.message });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

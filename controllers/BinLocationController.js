const ScheduleService = require("../services/WasteScheduleService");

exports.scheduleWaste = async (req, res, next) => {
  try {
    const { UserId, WasteType, ScheduledDate, Location } = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await ScheduleService.scheduleWaste(
      UserId,
      WasteType,
      ScheduledDate,
      Location
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

const ScheduleService = require("../services/WasteScheduleService");

exports.scheduleWaste = async (req, res, next) => {
  try {
    const { UserId, WasteType, ScheduledDate, ScheduleState } = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await ScheduleService.scheduleWaste(
      UserId,
      WasteType,
      ScheduledDate,
      ScheduleState
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

exports.getSchedules = async (req, res, next) => {
  try {
    const { UserId, ScheduleState } = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await ScheduleService.getScheduleWaste(
      UserId,
      ScheduleState
    );
    // Log the success response
    console.log("Success Response:", successRes);

    if (successRes.success) {
      res.status(201).json({
        status: true,
        scheduls: successRes.schedules,
        user: successRes.user,
      });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.updateScheduleDate = async (req, res, next) => {
  try {
    const { scheduleId, scheduleDate } = req.body;

    // Update the location
    const successRes = await ScheduleService.updateScheduleDate(
      scheduleId,
      scheduleDate
    );

    // Handle the response based on the successRes
    if (successRes.success) {
      res.status(200).json({ status: true, success: successRes.message });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    // Log the error details
    console.error("Update schedule Error:", error);

    // Send internal server error response
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
exports.deleteScheduleData = async (req, res, next) => {
  try {
    const { scheduleId } = req.body;

    // Update the location
    const successRes = await ScheduleService.deleteScheduleData(scheduleId);

    // Handle the response based on the successRes
    if (successRes.success) {
      res.status(200).json({ status: true, success: successRes.message });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    // Log the error details
    console.error("Delete schedule Error:", error);

    // Send internal server error response
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

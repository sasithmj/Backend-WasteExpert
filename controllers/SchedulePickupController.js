const SchedulePickupService = require("../services/SchedulePickupService");

exports.schedulePickup = async (req, res, next) => {
  try {
    const { area, date, collector, garbageTypes } = req.body;

    const newSchedulepickup = await SchedulePickupService.addSchedulePickup(
      area,
      date,
      collector,
      garbageTypes
    );

    console.log("Success Response:", newSchedulepickup);

    if (newSchedulepickup.success) {
      return res
        .status(201)
        .json({ status: true, success: newSchedulepickup.message });
    } else {
      return res
        .status(400)
        .json({ status: false, error: newSchedulepickup.message });
    }
  } catch (error) {
    console.error("Error in schedulePickup controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

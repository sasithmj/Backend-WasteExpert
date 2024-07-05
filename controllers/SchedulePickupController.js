const SchedulePickupService = require("../services/SchedulePickupService");

exports.schedulePickup = async (req, res, next) => {
  console.log("schedulePickup function invoked");

  try {
    const { area, date, collector, garbageTypes } = req.body.formData;
    console.log("Request Body:", req.body);

    const newSchedulepickup = await SchedulePickupService.addSchedulePickup(
      area,
      date,
      collector,
      garbageTypes
    );

    console.log("Service Response:", newSchedulepickup);

    if (newSchedulepickup.success) {
      console.log("Success: Scheduling pickup succeeded");
      return res
        .status(201)
        .json({ status: true, success: newSchedulepickup.message });
    } else {
      console.log(
        "Error: Scheduling pickup failed with message:",
        newSchedulepickup.message
      );
      return res
        .status(400)
        .json({ status: false, error: newSchedulepickup.message });
    }
  } catch (error) {
    console.error("Error in schedulePickup controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

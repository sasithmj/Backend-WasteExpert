const SchedulePickupService = require("../services/SchedulePickupService");

exports.newSchedulePickup = async (req, res, next) => {
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

exports.getShedulePickups = async (req, res, next) => {
  try {
    const {area, date, collector, garbageTypes, Status} = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await SchedulePickupService.getSmartBin(
      area, 
      date, 
      collector, 
      garbageTypes, 
      Status
    );
    // Log the success response
    console.log("Success Response:", successRes);

    if (successRes.success) {
      res.status(201).json({
        status: true,
        shedulepickups: successRes.shedulepickups,
      });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

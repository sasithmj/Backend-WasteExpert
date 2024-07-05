const SmartBinService = require("../services/SmartBinService");

exports.smartBin = async (req, res, next) => {
  console.log("SmartBin function invoked");

  try {
    const { area, locationLat, locationLng, garbageTypes, fillLevel } = req.body.formData;
    console.log("Request Body:", req.body);

    const newSmartBin = await SmartBinService.addNewSmartBin(
      area,
      locationLat,
      locationLng,
      garbageTypes,
      fillLevel
    );

    console.log("Service Response:", newSmartBin);

    if (newSmartBin.success) {
      console.log("Success: New SmartBin Adding succeeded");
      return res
        .status(201)
        .json({ status: true, success: newSmartBin.message });
    } else {
      console.log(
        "Error: New SmartBin Adding failed with message:",
        newSmartBin.message
      );
      return res
        .status(400)
        .json({ status: false, error: newSmartBin.message });
    }
  } catch (error) {
    console.error("Error in NewSmartBin controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

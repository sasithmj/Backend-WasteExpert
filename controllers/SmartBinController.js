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

exports.getSmartBin = async (req, res, next) => {
  try {
    const { area, locationLat, locationLng, garbageTypes, fillLevel } = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await SmartBinService.getSmartBin(
      area,
      locationLat,
      locationLng,
      garbageTypes,
      fillLevel
    );
    // Log the success response
    console.log("Success Response:", successRes);

    if (successRes.success) {
      res.status(201).json({
        status: true,
        smartbins: successRes.smartbins,
      });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
  }

// Method to get nearby smart bins
exports.getNearbySmartBins = async (req, res, next) => {
  console.log("getNearbySmartBins function invoked");

  try {
    const { lat, lng, radius } = req.body;
    console.log("Request Body:", req.body);

    const result = await SmartBinService.getNearbySmartBins(lat, lng, radius);

    console.log("Service Response:", result);

    if (result.success) {
      console.log("Success: Fetched nearby smart bins");
      return res.status(200).json({ status: true, bins: result.bins });
    } else {
      console.log(
        "Error: Fetching nearby smart bins failed with message:",
        result.message
      );
      return res.status(400).json({ status: false, error: result.message });
    }
  } catch (error) {
    console.error("Error in getNearbySmartBins controller:", error);

    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

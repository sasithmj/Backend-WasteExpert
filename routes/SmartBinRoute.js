const route = require("express").Router();
const SmartBinController = require("../controllers/SmartBinController");

route.post("/smartbin", SmartBinController.smartBin);
route.post("/getSmartBin", SmartBinController.getSmartBin);

module.exports = route;

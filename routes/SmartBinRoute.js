const route = require("express").Router();
const SmartBinController = require("../controllers/SmartBinController");

route.post("/smartbin", SmartBinController.smartBin);

module.exports = route;

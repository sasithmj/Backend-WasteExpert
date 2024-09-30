const route = require("express").Router();
const reportController = require("../controllers/WasteReportController");

route.post("/reportWaste", reportController.reportWaste);
route.post("/getReportedWaste", reportController.getWasteReportsByUser);

module.exports = route;

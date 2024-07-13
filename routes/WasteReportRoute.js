const route = require("express").Router();
const reportController = require("../controllers/WasteReportController");

route.post("/reportWaste", reportController.reportWaste);
route.post("/reportWastes", reportController.reportWaste);

module.exports = route;

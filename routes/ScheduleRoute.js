const route = require("express").Router();
const scheduleController = require("../controllers/ScheduleController");

route.post("/scheduleWaste", scheduleController.scheduleWaste);

module.exports = route;

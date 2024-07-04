const route = require("express").Router();
const scheduleController = require("../controllers/ScheduleController");

route.post("/scheduleWaste", scheduleController.scheduleWaste);
route.post("/getscheduleWaste", scheduleController.getSchedules);
route.post("/updatescheduleWaste", scheduleController.updateScheduleDate);
route.post("/deletescheduleWaste", scheduleController.deleteScheduleData);

module.exports = route;

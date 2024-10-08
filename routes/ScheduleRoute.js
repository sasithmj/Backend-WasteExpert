const route = require("express").Router();
const scheduleController = require("../controllers/ScheduleController");

route.post("/scheduleWaste", scheduleController.scheduleWaste);
route.post("/getscheduleWaste", scheduleController.getSchedules);
route.post("/updatescheduleWaste", scheduleController.updateScheduleDate);
route.post("/updateScheduleState", scheduleController.updateScheduleState);
route.post("/updateScheduleStateToFinish", scheduleController.updateScheduleStateToFinish);
route.post("/deletescheduleWaste", scheduleController.deleteScheduleData);
route.post("/getAllScheduleWaste", scheduleController.getAllScheduleWaste);

module.exports = route;

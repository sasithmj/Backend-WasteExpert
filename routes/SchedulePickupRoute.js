const route = require("express").Router();
const schedulePickupController = require("../controllers/SchedulePickupController");

route.post("/newschedulepickup", schedulePickupController.newSchedulePickup);
route.post("/getschedulepickup", schedulePickupController.getShedulePickups);
route.post("/getSchedulePickupToCollector", schedulePickupController.getSchedulePickupToCollector);
// route.post("/updateSchedules", schedulePickupController.updateSchedules);
route.post("/updateScheduleLocationInPickup", schedulePickupController.updateScheduleLocationInPickup);
route.post("/getScheduleByUserId", schedulePickupController.getSchedulePickupsByUserId);

module.exports = route;

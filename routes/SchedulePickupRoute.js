const route = require("express").Router();
const schedulePickupController = require("../controllers/SchedulePickupController");

route.post("/newschedulepickup", schedulePickupController.newSchedulePickup);
route.post("/getschedulepickup", schedulePickupController.getShedulePickups);
route.post("/getSchedulePickupToCollector", schedulePickupController.getSchedulePickupToCollector);

module.exports = route;

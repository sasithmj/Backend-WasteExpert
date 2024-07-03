const route = require("express").Router();
const schedulePickupController = require("../controllers/SchedulePickupController");

route.post("/schedulepickup", schedulePickupController.schedulePickup);

module.exports = route;

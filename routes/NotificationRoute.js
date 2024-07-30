const route = require("express").Router();
const notificationController = require("../controllers/NotificationController");

route.post("/notify", notificationController.sendNotification);

module.exports = route;

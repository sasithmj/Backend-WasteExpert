const route = require("express").Router();
const DispatcherController = require("../controllers/DispatcherController");

route.post("/addDispatcher", DispatcherController.addDispatcher);

module.exports = route;

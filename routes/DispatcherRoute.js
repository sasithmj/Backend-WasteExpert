const route = require("express").Router();
const DispatcherController = require("../controllers/dispatcherController");

route.post("/addDispatcher", DispatcherController.addDispatcher);

module.exports = route;

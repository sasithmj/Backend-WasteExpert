const route = require("express").Router();
const DispatcherController = require("../controllers/DispatcherController");

route.post("/addDispatcher", DispatcherController.addDispatcher);
route.post("/login", DispatcherController.dispatcherLogin);

module.exports = route;

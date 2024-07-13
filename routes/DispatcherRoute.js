const route = require("express").Router();
const DispatcherController = require("../controllers/DispatcherController");

route.post("/addDispatcher", DispatcherController.addDispatcher);
route.post("/login", DispatcherController.dispatcherLogin);
route.post("/getAllDis", DispatcherController.getAllDis);

module.exports = route;

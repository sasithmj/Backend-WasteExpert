const route = require("express").Router();
const DispatcherController = require("../controllers/DispatcherController");

route.post("/addDispatcher", DispatcherController.addDispatcher);
route.post("/login", DispatcherController.dispatcherLogin);
route.post("/getAllDis", DispatcherController.getAllDis);
route.post("/deleteDis", DispatcherController.deleteDispatcher);
route.post("/updateDis", DispatcherController.updateDispatcher);
route.post("/updateDisbyUser", DispatcherController.updateDispatcherbyUser);
route.post("/changePassword", DispatcherController.changePassword); // Add this line
route.post("/getDispatcherDetails", DispatcherController.getDispatcherDetails);

module.exports = route;

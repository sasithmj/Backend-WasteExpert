const route = require("express").Router();
const adminController = require("../controllers/AdminController");

route.post("/register", adminController.register);
route.post("/login", adminController.login);
route.post("/addAdmin", adminController.addAdmin);

module.exports = route;


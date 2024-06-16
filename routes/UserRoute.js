const route = require("express").Router();
const userController = require("../controllers/UserController");

route.post("/registration", userController.register);
route.post("/login", userController.login);

module.exports = route;

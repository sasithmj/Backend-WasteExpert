const route = require("express").Router();
const userController = require("../controllers/UserController");

route.post("/registration", userController.register);
route.post("/login", userController.login);
route.post("/updatelocation", userController.updateLocation);
route.post("/updateaddress", userController.updateAddress);
route.post("/userdetails", userController.getUserDetails);
route.post("/updateprofilepicture", userController.updateProfilePicture);
route.post("/updateProfile", userController.updateUserData);

module.exports = route;

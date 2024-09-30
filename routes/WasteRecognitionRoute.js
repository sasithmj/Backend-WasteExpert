const route = require("express").Router();
const imageController = require("../controllers/WasteRecognitionController");

route.post("/recognizeWaste", imageController.recognizeWaste);

module.exports = route;

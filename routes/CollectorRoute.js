const route = require("express").Router();
const collectorController = require("../controllers/CollectorController");

route.post("/addCollector", collectorController.addCollector);

module.exports = route;

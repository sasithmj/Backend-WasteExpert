const route = require("express").Router();
const collectorController = require("../controllers/CollectorController");


route.post("/addCollector", collectorController.addCollector);
route.post("/login", collectorController.loginCollector);
route.post("/getAllCol", collectorController.getAllCol);



// Route to add garbage weight (no token required)
route.post("/addGarbageWeight", collectorController.addGarbageWeight);

module.exports = route;

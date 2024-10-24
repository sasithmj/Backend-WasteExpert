const route = require("express").Router();
const collectorController = require("../controllers/CollectorController");


route.post("/addCollector", collectorController.addCollector);
route.post("/login", collectorController.loginCollector);
route.post("/getAllCol", collectorController.getAllCol);
route.post("/deleteCol", collectorController.deleteCollector);
route.post("/updateCol", collectorController.updateCollector);
route.post("/updateColbyUser", collectorController.updateCollectorbyUser);
route.post("/changePassword", collectorController.changePassword);
route.post("/getCollectorDetails", collectorController.getCollectorDetails);




// Route to add garbage weight (no token required)
route.post("/addGarbageWeight", collectorController.addGarbageWeight);

module.exports = route;

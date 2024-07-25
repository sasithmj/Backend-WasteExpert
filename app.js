// app.js

const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const scheduleRoute = require("./routes/ScheduleRoute");
const schedulePickupRoute = require("./routes/SchedulePickupRoute");
const SmartBinRoute = require("./routes/SmartBinRoute");
const AdminRoute = require("./routes/AdminRoute");
const DispatcherRoute = require("./routes/DispatcherRoute");
const CollectorRoute = require("./routes/CollectorRoute");
const WasteReportRoute = require("./routes/WasteReportRoute");

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", userRoute);
app.use("/admin", AdminRoute);
app.use("/schedule", scheduleRoute);
app.use("/reportWaste", WasteReportRoute);
app.use("/collector", CollectorRoute);


//web
app.use("/schedulePickup", schedulePickupRoute);
app.use("/smartbin", SmartBinRoute);
app.use("/addAdmin", AdminRoute);
app.use("/addDispatcher", DispatcherRoute);
app.use("/addCollector", CollectorRoute);

module.exports = app;

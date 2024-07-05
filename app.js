// app.js

const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const scheduleRoute = require("./routes/ScheduleRoute");
const schedulePickupRoute = require("./routes/SchedulePickupRoute");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/schedule", scheduleRoute);

//add this
app.use("/schedulePickup", schedulePickupRoute);

module.exports = app;

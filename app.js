const express = require("express");
const body_parser = require("body-parser");
const userRoute = require("./routes/UserRoute");
const scheduleRoute = require("./routes/ScheduleRoute");

const app = express();

app.use(body_parser.json());
app.use(express.json());
app.use("/", userRoute);
app.use("/schedule", scheduleRoute);

module.exports = app;

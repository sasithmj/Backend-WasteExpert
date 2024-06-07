const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection = mongoose
  .createConnection(process.env.MONGODB_CONNECTION_LINK)
  .on("open", () => {
    console.log("MongoDB Connected");
  })
  .on("error", (err) => {
    console.log("MongoDB Connection error" + err);
  });

module.exports = connection;

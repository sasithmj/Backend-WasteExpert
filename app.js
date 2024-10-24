// app.js
var multer = require("multer");
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
const NotificationRoute = require("./routes/NotificationRoute");
const ImageRecognitionRoute = require("./routes/WasteRecognitionRoute");
const RewardsRoute = require("./routes/RewardsRoute");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8T6W099hSsFf-WTiQC6-rW4VzklR6qNg",
  authDomain: "wasteexpert-64848.firebaseapp.com",
  projectId: "wasteexpert-64848",
  storageBucket: "wasteexpert-64848.appspot.com",
  messagingSenderId: "961049919020",
  appId: "1:961049919020:web:6fa3ef5af8eb7ab64fdb89",
  measurementId: "G-K7ZBZHDWQD",
};

const serviceAccount = require("./wasteexpert-64848-firebase-adminsdk-zkb52-f7fe7784c0.json"); // Ensure you have the service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com", // Replace with your database URL
});

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseapp);

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// custom error handling middleware for Multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // handle multer-specific errors
    res.status(400).send({ error: err.message });
  } else if (err) {
    // handle other errors
    res.status(500).send({ error: "An unexpected error occurred" });
  } else {
    next(); // no errors, proceed to the next middleware
  }
};

// storage for user profile image
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.query?.user}.png`);
  },
});

const uploadUser = multer({ storage: userStorage });

app.use(
  "/image",
  uploadUser.single("profileImage"),
  multerErrorHandler
);

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
app.use("/notification", NotificationRoute);
app.use("/recognize", ImageRecognitionRoute);
app.use("/rewards", RewardsRoute);

//web
app.use("/schedulePickup", schedulePickupRoute);
app.use("/smartbin", SmartBinRoute);
app.use("/addAdmin", AdminRoute);
app.use("/addDispatcher", DispatcherRoute);
app.use("/addCollector", CollectorRoute);

module.exports = app;

const WasteReportService = require("../services/WasteReportService");
const multer = require("multer");

const path = require("path");

// Configure Multer to store files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  }
});

const upload = multer({ storage });

exports.reportWaste = (req, res, next) => {
  upload.single("Photo")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors
      return res.status(400).json({ status: false, error: err.message });
    } else if (err) {
      // Handle other errors
      return res
        .status(500)
        .json({ status: false, error: "File upload error" });
    }

    try {
      const {
        UserId,
        locationLat,
        locationLng,
        ReportDate,
        Description,
        WasteTypes,
      } = req.body;

      const photoPath = req.file ? req.file.path : null;

      const successRes = await WasteReportService.reportWaste(
        UserId,
        photoPath,
        locationLat,
        locationLng,
        ReportDate,
        Description,
        WasteTypes
      );

      if (successRes.success) {
        res.status(201).json({ status: true, success: successRes.message });
      } else {
        res.status(400).json({ status: false, error: successRes.message });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  });
};


exports.getWasteReportsByUser = async (req, res, next) => {
  try {
    const { UserId } = req.body;

    const reportsRes = await WasteReportService.getReportsByUserId(UserId);

    if (reportsRes.success) {
      res.status(200).json({ status: true, data: reportsRes.data });
    } else {
      res.status(404).json({ status: false, error: "No reports found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

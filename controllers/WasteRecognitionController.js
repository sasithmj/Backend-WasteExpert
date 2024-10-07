const multer = require("multer");

const path = require("path");
const RecognizeWasteService = require("../services/RecognizeWasteService");

// Configure Multer to store files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  },
});

const upload = multer({ storage });

exports.recognizeWaste = (req, res, next) => {
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
      const photoPath = req.file ? req.file.path : null;

      const successRes = await RecognizeWasteService.recognizeWaste(photoPath);

      if (successRes.success) {
        res.status(201).json({
          status: true,
          success: successRes.message,
          data: successRes.data,
        });
      } else {
        res.status(400).json({ status: false, error: successRes.message });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  });
};

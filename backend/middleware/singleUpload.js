const multer = require("multer");
const path = require("path");
const fs = require("fs");
const validateFileType = require("../utils/validateFileType");
const generateFilename = require("../utils/generateFileName");

const getUploader = (folder = "uploads") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "..", folder);

      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const userId = req.user?.id || "guest"; // Optional: pull from auth
      const uniqueName = generateFilename(file.originalname, userId);
      cb(null, uniqueName);
    },
  });

  return multer({
    storage,
    limits: { fileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024 }, // Default to 5MB
    fileFilter: (req, file, cb) => {
      validateFileType(file.originalname)
        ? cb(null, true)
        : cb(new Error("Only JPG, JPEG, and PNG files are allowed"));
    },
  });
};

module.exports = getUploader;

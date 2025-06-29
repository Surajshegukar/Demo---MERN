const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getUploader = (folder = "uploads") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "..", folder);

      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${file.originalname}`;
      cb(null, unique);
    },
  });

  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPG, JPEG, and PNG files are allowed"));
      }
    },
  });
};

module.exports = getUploader;
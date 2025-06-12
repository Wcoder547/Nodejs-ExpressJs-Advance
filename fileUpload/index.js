import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure 'uploads' directory exists
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(uploadsPath)); // Serve uploaded files

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const newFileName =
      Date.now() + "-" + file.fieldname + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

// File type filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, or PDF files are allowed"), false);
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 11, // 11MB
  },
  fileFilter: fileFilter,
});

// Routes

// 1. Single file upload
app.post("/upload-single", upload.single("helloFile"), (req, res, next) => {
  try {
    if (!req.file) throw new Error("No file uploaded");
    res.status(200).json({
      success: true,
      message: "Single file uploaded successfully",
      file: req.file,
      url: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    next(err);
  }
});

// 2. Multiple files with same field name
app.post("/upload-array", upload.array("imagefile", 5), (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0)
      throw new Error("No files uploaded");
    res.status(200).json({
      success: true,
      message: "Multiple files uploaded successfully",
      files: req.files.map((f) => ({
        original: f.originalname,
        stored: f.filename,
        url: `/uploads/${f.filename}`,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// 3. Multiple files with different field names
app.post(
  "/upload-fields",
  upload.fields([
    { name: "profilepic", maxCount: 1 },
    { name: "documents", maxCount: 3 },
  ]),
  (req, res, next) => {
    try {
      if (!req.files || (!req.files.profilepic && !req.files.documents)) {
        throw new Error("No files uploaded in fields");
      }

      res.status(200).json({
        success: true,
        message: "Files from multiple fields uploaded successfully",
        profilepic: req.files.profilepic?.map((f) => ({
          original: f.originalname,
          stored: f.filename,
          url: `/uploads/${f.filename}`,
        })),
        documents: req.files.documents?.map((f) => ({
          original: f.originalname,
          stored: f.filename,
          url: `/uploads/${f.filename}`,
        })),
      });
    } catch (err) {
      next(err);
    }
  }
);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  if (err.name === "MulterError") {
    return res
      .status(400)
      .json({ success: false, message: `Multer error: ${err.message}` });
  }

  if (
    err.message === "Only JPEG, PNG, or PDF files are allowed" ||
    err.message === "No file uploaded" ||
    err.message === "No files uploaded" ||
    err.message === "No files uploaded in fields"
  ) {
    return res.status(415).json({ success: false, message: err.message });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

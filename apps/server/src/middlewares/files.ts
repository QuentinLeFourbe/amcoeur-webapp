import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (_req, _res, cb) {
    // If you change this path, update it in the fly.toml for the volume mounts
    cb(null, new URL("../../uploads", import.meta.url).toString());
  },
  filename: function (_req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueName + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 500,
  },
});

export default upload;

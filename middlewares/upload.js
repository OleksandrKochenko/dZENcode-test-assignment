const multer = require("multer");
const path = require("path");
const {
  imageMaxSize,
  imageFormats,
  textFormats,
} = require("../helpers/constants");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { originalname } = file;
    const filename = `${uniquePreffix}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: imageMaxSize,
  },
  fileFilter: function (req, file, cb) {
    if (
      ((file.fieldname === "img" || file.fieldname === "avatar") &&
        imageFormats.includes(file.mimetype)) ||
      (file.fieldname === "text_file" && textFormats.includes(file.mimetype))
    ) {
      cb(null, true);
    } else {
      const err = new Error("Unaccepted file type");
      err.status = 422;
      cb(err);
    }
  },
});

module.exports = upload;

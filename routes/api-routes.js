const express = require("express");
const { getUsers } = require("../controllers/api-controllers");
const optimizeImages = require("../middlewares/optimize-images");
const upload = require("../middlewares/upload");

const router = express.Router();

const testFiles = (req, res, next) => {
  try {
    const { body, files } = req;

    res.status(200).json({ body, files });
  } catch (error) {
    next(error);
  }
};

router.get("/test-form", (req, res) => {
  res.render("index");
});

router.get("/users", getUsers);

router.post(
  "/test",
  upload.fields([
    { name: "text_file", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
    { name: "img", maxCount: 3 },
  ]),
  optimizeImages,
  testFiles
);

module.exports = router;

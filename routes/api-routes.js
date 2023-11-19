const express = require("express");
require("dotenv").config();
const { CAPTCHA_SITE_KEY } = process.env;

const {
  getUsers,
  addComent,
  addAuthComment,
} = require("../controllers/api-controllers");
const optimizeImages = require("../middlewares/optimize-images");
const upload = require("../middlewares/upload");
const reCaptcha = require("../middlewares/validate-captcha");
const authenticate = require("../middlewares/authenticate");
const { validateTextBody } = require("../middlewares/validate-body");

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
  res.render("index", { key: CAPTCHA_SITE_KEY });
});

router.post("/comment", reCaptcha, addComent);

router.post(
  "/comment-auth",
  authenticate,
  upload.fields([
    { name: "text_file", maxCount: 1 },
    { name: "img", maxCount: 3 },
  ]),
  optimizeImages,
  validateTextBody,
  addAuthComment
);

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

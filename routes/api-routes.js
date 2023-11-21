const express = require("express");
require("dotenv").config();
const { CAPTCHA_SITE_KEY } = process.env;
const {
  getUsers,
  addComent,
  addAuthComment,
  getUserById,
  getComments,
  getCommentById,
  getMyComments,
  deleteMyComment,
} = require("../controllers/api-controllers");
const upload = require("../middlewares/upload");
const reCaptcha = require("../middlewares/validate-captcha");
const authenticate = require("../middlewares/authenticate");
const {
  validateTextBody,
  validateUnauthTextBody,
} = require("../middlewares/validate-body");
const isValidId = require("../middlewares/isValidId");
const validateTextFile = require("../middlewares/validate-text-file");
const { txtAllowedQty, imgAllowedQty } = require("../helpers/constants");

const router = express.Router();

router.get("/test-form", (req, res) => {
  res.render("index", { key: CAPTCHA_SITE_KEY });
});

router.post("/comment", reCaptcha, validateUnauthTextBody, addComent);

router.post(
  "/comment-auth",
  authenticate,
  upload.fields([
    { name: "text_file", maxCount: txtAllowedQty },
    { name: "img", maxCount: imgAllowedQty },
  ]),
  validateTextFile,
  validateTextBody,
  addAuthComment
);

router.get("/comments", getComments);

router.get("/comments/my", authenticate, getMyComments);

router.get("/comments/:id", isValidId, getCommentById);

router.delete("/comments/:id", authenticate, isValidId, deleteMyComment);

router.get("/users", getUsers);

router.get("/users/:id", isValidId, getUserById);

module.exports = router;

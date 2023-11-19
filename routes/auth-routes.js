const express = require("express");
const { validateRegisterBody } = require("../middlewares/validate-body");
const upload = require("../middlewares/upload");
const { signup } = require("../controllers/auth-controllers");

const router = express.Router();

router.post(
  "/signup",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  validateRegisterBody,
  signup
);

module.exports = router;

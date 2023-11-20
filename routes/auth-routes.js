const express = require("express");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUserUpdateBody,
} = require("../middlewares/validate-body");
const upload = require("../middlewares/upload");
const {
  signup,
  signin,
  update,
  getCurrent,
  logout,
} = require("../controllers/auth-controllers");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/signup",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  validateRegisterBody,
  signup
);

router.post("/signin", validateLoginBody, signin);

router.put(
  "/update",
  authenticate,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  validateUserUpdateBody,
  update
);

router.get("/current", authenticate, getCurrent);

router.post("/signout", authenticate, logout);

module.exports = router;

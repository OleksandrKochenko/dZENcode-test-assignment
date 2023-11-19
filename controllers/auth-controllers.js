const tinify = require("tinify");
const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, TINIFY_API_KEY } = process.env;
const httpError = require("../helpers/http-error");
const User = require("../models/user");
const cloudinary = require("../helpers/cloudinary");

const signup = async (req, res, next) => {
  try {
    const { body, files } = req;

    const existedUser = await User.findOne({ email: body.email });
    if (existedUser) throw httpError(409, "Email already in use");

    const hashedPswrd = await bcrypt.hash(body.password, 10);
    body.password = hashedPswrd;

    const filePath = files.avatar[0].path;
    if (filePath) {
      tinify.key = TINIFY_API_KEY;
      const source = tinify.fromFile(filePath);
      const resized = source.resize({
        method: "cover",
        width: 150,
        height: 150,
      });
      await resized.toFile(filePath);

      const fileData = await cloudinary.uploader.upload(filePath, {
        folder: "users",
      });

      body.avatar = fileData.url;
      fs.unlink(filePath);
    }

    const newUser = await User.create({
      ...req.body,
    });

    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};

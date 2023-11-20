const tinify = require("tinify");
const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, TINIFY_API_KEY } = process.env;
const httpError = require("../helpers/http-error");
const User = require("../models/user");
const cloudinary = require("../helpers/cloudinary");

tinify.key = TINIFY_API_KEY;

const signup = async (req, res, next) => {
  try {
    const { body, files } = req;
    const filePath = files.avatar[0].path;

    const existedUser = await User.findOne({ email: body.email });
    if (existedUser) {
      fs.unlink(filePath);
      throw httpError(409, "Email already in use");
    }

    const hashedPswrd = await bcrypt.hash(body.password, 10);
    body.password = hashedPswrd;

    if (filePath) {
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

    res.status(201).json({ message: "User registered", userId: newUser._id });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw httpError(401, "Email or password is wrong");

    const validUserd = await bcrypt.compare(password, user.password);
    if (!validUserd) throw httpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({ message: "User logged in", token, userId: user._id });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { body, files, user } = req;
    const filePath = files.avatar[0].path;

    if (filePath) {
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

    if (body.password) {
      const hashedPswrd = await bcrypt.hash(body.password, 10);
      body.password = hashedPswrd;
    }

    await User.findByIdAndUpdate(user._id, { ...body });

    res.json({ message: "User updated", userId: user._id });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { name, email, _id } = req.user;
    res.json({
      message: "User is current",
      user: { userId: _id, name, email },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "User logged out" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  update,
  getCurrent,
  logout,
};

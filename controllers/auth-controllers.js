const httpError = require("../helpers/http-error");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { SECRET_KEY } = process.env;
const User = require("../models/user");

const signup = async (req, res, next) => {
  try {
    const {
      body,
      // file
    } = req.body;

    const existedUser = await User.findOne({ email: body.email });
    if (existedUser) throw httpError(409, "Email already in use");

    const hashedPswrd = await bcrypt.hash(body.password, 10);

    //   if (file.path) {

    //   }

    // const avatarLink =
    //   avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;

    const newUser = await User.create({
      ...req.body,
      password: hashedPswrd,
      // avatarURL: avatarLink,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};

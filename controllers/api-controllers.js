const User = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const addComent = async (req, res, next) => {
  try {
    const { name, email, home_page: homePage, text } = req.body;
    res.json({
      message:
        "Comment creation has successfully passed reCAPTCHA and got data",
      data: { name, email, homePage, text },
    });
  } catch (error) {
    next(error);
  }
};

const addAuthComment = async (req, res, next) => {
  try {
    const { body, user } = req;

    res.json({ body, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  addComent,
  addAuthComment,
};

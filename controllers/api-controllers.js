const Comment = require("../models/comment");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password -token");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const addComent = async (req, res, next) => {
  try {
    const { email, text } = req.body;
    const user = await User.findOne({ email });
    const data = user ? { text, owner: user._id } : { text };
    const { _id } = await Comment.create({ ...data });
    res.json({
      message: "Comment created with reCAPTCHA",
      commentId: _id,
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

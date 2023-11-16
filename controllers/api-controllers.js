const User = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};

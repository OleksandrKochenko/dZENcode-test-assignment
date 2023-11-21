const httpError = require("../helpers/http-error");
const { uploadTxt, uploadImages } = require("../helpers/uploadCommentFiles");
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

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "-password -token");
    res.json({ message: "Got user by id", user });
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
    const { body, user, files } = req;
    const txtUrls = await uploadTxt(files.text_file);
    const imgUrls = await uploadImages(files.img);
    body.img = imgUrls;
    body.text_file = txtUrls;
    body.owner = user._id;
    const { _id } = await Comment.create({ ...body });

    res.status(201).json({ message: "Comment added", commentId: _id });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { page = 1, limit = 25 } = req.query;
    const skip = (page - 1) * limit;
    const comments = await Comment.find({}, "", {
      skip,
      limit,
    });
    const total = await Comment.find().count();
    res.json({ page, perPage: limit, total, comments });
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.json({ message: "Got comment by id", comment });
  } catch (error) {
    next(error);
  }
};

const getMyComments = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 25 } = req.query;
    const skip = (page - 1) * limit;
    const comments = await Comment.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "name email");
    const total = await Comment.find({ owner }).count();

    res.json({ page, perPage: limit, total, comments });
  } catch (error) {
    next(error);
  }
};

const deleteMyComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      throw httpError(404, "Comment not found");
    }
    if (!comment.owner.equals(req.user._id)) {
      throw httpError(400, "Is not owner of comment");
    }
    await Comment.findByIdAndDelete(id);
    res.json({ message: "Comment deleted", commentId: id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addComent,
  addAuthComment,
  getComments,
  getCommentById,
  getMyComments,
  deleteMyComment,
};

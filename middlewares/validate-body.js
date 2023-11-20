const httpError = require("../helpers/http-error");
const {
  commentSchema,
  registerSchema,
  unauthCommentSchema,
  loginSchema,
  userUpdateSchema,
} = require("../helpers/joi-schemas");

const validateTextBody = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

const validateUnauthTextBody = (req, res, next) => {
  const { error } = unauthCommentSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

const validateRegisterBody = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

const validateLoginBody = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

const validateUserUpdateBody = (req, res, next) => {
  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

module.exports = {
  validateRegisterBody,
  validateLoginBody,
  validateUnauthTextBody,
  validateTextBody,
  validateUserUpdateBody,
};

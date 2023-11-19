const httpError = require("../helpers/http-error");
const { commentSchema, registerSchema } = require("../helpers/joi-schemas");

const validateTextBody = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
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

module.exports = { validateTextBody, validateRegisterBody };

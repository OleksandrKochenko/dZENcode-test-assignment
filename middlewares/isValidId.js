const { isValidObjectId } = require("mongoose");

const httpError = require("../helpers/http-error");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(422, `Invalid id format`));
  }
  next();
};

module.exports = isValidId;

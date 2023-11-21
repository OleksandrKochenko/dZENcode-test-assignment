const { textMaxSize } = require("../helpers/constants");
const fs = require("fs/promises");
const httpError = require("../helpers/http-error");

const validateTextFile = async (req, res, next) => {
  try {
    const { files } = req;

    if (files.text_file) {
      files.text_file.forEach(async (el) => {
        if (el.size > textMaxSize) {
          await fs.unlink(el.path);
          next(httpError(422, "Unaccepted file size"));
        } else {
          next();
        }
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validateTextFile;

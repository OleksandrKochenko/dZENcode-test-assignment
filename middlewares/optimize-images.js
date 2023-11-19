const tinify = require("tinify");
const fs = require("fs/promises");
const httpError = require("../helpers/http-error");
const { textMaxSize } = require("../helpers/constants");
const { TINIFY_API_KEY } = process.env;

tinify.key = TINIFY_API_KEY;

const optimizeImages = async (req, res, next) => {
  try {
    const { files } = req;
    if (!files) {
      next();
    }

    if (files.text_file) {
      const tooBig = files.text_file.map(async (el) => {
        el.size > textMaxSize && (await fs.unlink(el.path));
      });
      tooBig.lenght > 0 && next(httpError(422, "Unaccepted file size"));
    }

    if (files.img) {
      files.img.map(async (el) => {
        const source = tinify.fromFile(el.path);
        const resized = source.resize({
          method: "cover",
          width: 320,
          height: 240,
        });
        await resized.toFile(el.path);
      });
    }

    if (files.avatar) {
      files.avatar.map(async (el) => {
        const source = tinify.fromFile(el.path);
        const resized = source.resize({
          method: "cover",
          width: 150,
          height: 150,
        });
        await resized.toFile(el.path);
        console.log("RESIZED", new Date());
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = optimizeImages;

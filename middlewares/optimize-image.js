const tinify = require("tinify");
const fs = require("fs/promises");
const { TINIFY_API_KEY } = process.env;

tinify.key = TINIFY_API_KEY;

const optimizeImage = async (req, res, next) => {
  const { file } = req;
  try {
    if (!file) {
      next();
    }
    const imgSize = file.fieldname === "avatar" ? 150 : 450;
    const source = tinify.fromFile(file.path);
    const resized = source.resize({
      method: "cover",
      width: imgSize,
      height: imgSize,
    });
    await resized.toFile(file.path);

    next();
  } catch (error) {
    file && (await fs.unlink(file.path));
    next(error);
  }
};

module.exports = optimizeImage;

const fs = require("fs/promises");
const cloudinary = require("./cloudinary");
const tinify = require("tinify");
const { TINIFY_API_KEY } = process.env;

tinify.key = TINIFY_API_KEY;

const uploadImages = async (files) => {
  if (!files) {
    return [];
  }
  const imgUrls = [];
  for (const file of files) {
    const source = tinify.fromFile(file.path);
    const resized = source.resize({
      method: "cover",
      width: 320,
      height: 240,
    });
    await resized.toFile(file.path);
    const { url } = await cloudinary.uploader.upload(file.path, {
      folder: "comments/img",
    });
    imgUrls.push(url);
    fs.unlink(file.path);
  }
  return imgUrls;
};

const uploadTxt = async (files) => {
  if (!files) {
    return [];
  }
  const txtUrls = [];
  for (const file of files) {
    const { url } = await cloudinary.uploader.upload(file.path, {
      folder: "comments/txt",
      resource_type: "raw",
    });
    txtUrls.push(url);
    fs.unlink(file.path);
  }
  return txtUrls;
};

module.exports = {
  uploadImages,
  uploadTxt,
};

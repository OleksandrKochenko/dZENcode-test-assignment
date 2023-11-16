const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const requiredMessage = "field required";
const invalidLenthMessage = "invalid length";
const imageFormats = ["image/jpeg", "image/gif", "image/png"];
const textFormats = ["text/plain"];

module.exports = {
  emailRegExp,
  requiredMessage,
  invalidLenthMessage,
  imageFormats,
  textFormats,
};

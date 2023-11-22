const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const requiredMessage = "Field required";
const invalidLenthMessage = "Invalid length";
const imageFormats = ["image/jpeg", "image/gif", "image/png"];
const textFormats = ["text/plain"];
const imageMaxSize = 1.5 * 1024 * 1024;
const textMaxSize = 100 * 1024;
const txtAllowedQty = 1;
const imgAllowedQty = 3;

module.exports = {
  emailRegExp,
  requiredMessage,
  invalidLenthMessage,
  imageFormats,
  textFormats,
  imageMaxSize,
  textMaxSize,
  txtAllowedQty,
  imgAllowedQty,
};

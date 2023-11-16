const { Schema, model } = require("mongoose");
const {
  requiredMessage,
  invalidLenthMessage,
  emailRegExp,
} = require("../helpers/constants");
const handleMongooseError = require("../middlewares/handle-mongoose-error");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, requiredMessage],
      minLength: [2, invalidLenthMessage],
      maxLength: [60, invalidLenthMessage],
    },
    email: {
      type: String,
      requiredMessage: [true, requiredMessage],
      unique: true,
      match: emailRegExp,
      minLength: [2, invalidLenthMessage],
      maxLength: [100, invalidLenthMessage],
    },
    password: {
      type: String,
      minlength: [6, invalidLenthMessage],
      required: [true, requiredMessage],
    },
    home_page: {
      type: String,
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;

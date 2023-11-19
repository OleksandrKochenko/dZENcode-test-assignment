const Joi = require("joi");

const {
  requiredMessage,
  emailRegExp,
  invalidLenthMessage,
} = require("./constants");

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .max(60)
    .messages({
      "any.required": `${requiredMessage}`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  email: Joi.string()
    .pattern(emailRegExp)
    .required()
    .min(2)
    .max(60)
    .messages({
      "any.required": `${requiredMessage}`,
      "string.pattern.base": `invalid email`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": `${invalidLenthMessage}`,
      "string.min": `${invalidLenthMessage}`,
    }),
  home_page: Joi.string(),
});

// const userLoginSchema = Joi.object({
//   email: Joi.string()
//     .pattern(userEmailRegExp)
//     .required()
//     .messages({
//       "any.required": `${userEmailMessage}`,
//       "string.pattern.base": `invalid email`,
//     }),
//   password: Joi.string()
//     .required()
//     .messages({
//       "any.required": `${userPasswordMessage}`,
//     }),
// });

// const userUpdateSchema = Joi.object({
//   name: Joi.string(),
//   password: Joi.string().min(6).messages({
//     "string.min": "invalid length of password",
//   }),
// });

const commentSchema = Joi.object({
  text: Joi.string()
    .required()
    .messages({
      "any.required": `${requiredMessage}`,
    }),
  thread_of: Joi.string(),
});

module.exports = {
  registerSchema,
  //   userLoginSchema,
  //   userUpdateSchema,
  commentSchema,
};

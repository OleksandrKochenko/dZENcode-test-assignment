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
      "string.pattern.base": `Invalid email`,
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
  home_page: Joi.string().allow(null, ""),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegExp)
    .required()
    .min(2)
    .max(60)
    .messages({
      "any.required": `${requiredMessage}`,
      "string.pattern.base": `Invalid email`,
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
});

const userUpdateSchema = Joi.object({
  name: Joi.string()
    .allow(null, "")
    .min(2)
    .max(60)
    .messages({
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  password: Joi.string()
    .allow(null, "")
    .min(6)
    .messages({
      "string.min": `${invalidLenthMessage}`,
    }),
  home_page: Joi.string().allow(null, ""),
});

const unauthCommentSchema = Joi.object({
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
      "string.pattern.base": `Invalid email`,
      "string.min": `${invalidLenthMessage}`,
      "string.max": `${invalidLenthMessage}`,
    }),
  text: Joi.string()
    .required()
    .messages({
      "any.required": `${requiredMessage}`,
    }),
  home_page: Joi.string().allow(null, ""),
  thread_of: Joi.string().allow(null, ""),
});

const commentSchema = Joi.object({
  text: Joi.string()
    .required()
    .messages({
      "any.required": `${requiredMessage}`,
    }),
  thread_of: Joi.string().allow(null, ""),
});

module.exports = {
  registerSchema,
  loginSchema,
  userUpdateSchema,
  commentSchema,
  unauthCommentSchema,
};

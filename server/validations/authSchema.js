const Joi = require("joi");

const usernameRule = Joi.string()
  .trim()
  .alphanum()
  .min(3)
  .max(30)
  .lowercase()
  .required()
  .messages({
    "string.base": "Username must be a type of text",
    "string.empty": "A unique username is required",
    "string.alphanum": "Username must only contain letters and numbers",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username is too long (max 30 characters)",
    "any.required": "A unique username is required",
  });

const passwordRule = Joi.string()
  .trim()
  .min(8)
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*])[a-zA-Z0-9@#$%&*]{8,}$/,
  )
  .required()
  .messages({
    "string.empty": "Password is required for account security",
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, %, &, *)",
    "any.required": "Password is required for account security",
  });

const signUpSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required to personalize your dashboard",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name is too long (max 30 characters)",
    "any.required": "Name is required to personalize your dashboard",
  }),
  username: usernameRule,
  password: passwordRule,
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Please confirm your password to continue",
    }),
});

const loginSchema = Joi.object({
  username: usernameRule,
  password: passwordRule,
});

module.exports = {
  signUpSchema,
  loginSchema,
};

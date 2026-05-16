const Joi = require("joi");

const logSchema = Joi.object({
  exercise: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "What exercise did you perform?",
    "string.min": "Exercise name is too short",
    "string.max": "Exercise name is too long",
    "any.required": "What exercise did you perform?",
  }),

  kg: Joi.number().min(0).required().messages({
    "number.base": "Weight must be a number",
    "number.min": "Weight cannot be negative",
    "any.required": "Weight (kg) is required",
  }),

  reps: Joi.number().integer().min(1).required().messages({
    "number.base": "Reps must be a number",
    "number.integer": "Reps must be a whole number",
    "number.min": "You must perform at least 1 rep",
    "any.required": "Number of reps is required",
  }),
});

module.exports = logSchema;

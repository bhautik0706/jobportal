const Joi = require("joi");
const schema = Joi.object().keys(
  {
    email: Joi.string()
      .pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      .messages({
        "string.empty": "Email cannot be empty",
        "string.pattern.base": "Please enter valid email",
        "any.required": "Email is required",
      })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
      .messages({
        "string.empty": "password cannot be empty",
        "string.pattern.base": "Please enter valid password",
        "any.required": "Password is required",
        "string.min": "Password length must be at least 8 characters long",
      })
      .required(),
    role: Joi.string()
      .valid("employeer", "jobseeker")
      .messages({
        "any.only":
          "Role type must be one of the following values: , employeer, jobseeker",
      }),
  },
  { abortEarly: false }
);

module.exports = schema;

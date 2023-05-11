const Joi = require("joi");
const schema = Joi.object().keys(
  {
    email: Joi.string()
      .pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      .messages({
        "string.pattern.base": "Please enter valid email",
        "string.empty": "email cannot be empty",
        
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
      .messages({
        "string.empty": "password cannot be empty",
        "string.pattern.base": "Please enter valid password",
        "string.min": "Password length must be at least 8 characters long",
      })
  },
  { abortEarly: false }
);

module.exports = schema;

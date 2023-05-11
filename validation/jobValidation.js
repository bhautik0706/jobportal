const Joi = require("joi");
const jobValidationSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp("[a-zA-Z0-9]{3,30}"))
    .messages({
      "string.empty": "Job title is required",
      "string.pattern.base":
        "Job title must be between 3 and 30 characters and can contain letters and numbers only",
    }),
  description: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp("[a-zA-Z0-9 ]{10,500}"))
    .messages({
      "string.empty": "Job description is required",
      "string.pattern.base":
        "Job description must be between 10 and 500 characters and can contain letters, numbers, and spaces only",
    }),
  company: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp("[a-zA-Z0-9 ]{3,50}"))
    .messages({
      "string.empty": "Company name is required",
      "string.pattern.base":
        "Company name must be between 3 and 50 characters and can contain letters, numbers, and spaces only",
    }),
  location: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp("[a-zA-Z0-9 ]{3,50}"))
    .messages({
      "string.empty": "Job location is required",
      "string.pattern.base":
        "Job location must be between 3 and 50 characters and can contain letters, numbers, and spaces only",
    }),
  salary: Joi.string().trim().pattern(new RegExp("[0-9]+")).messages({
    "string.pattern.base": "Salary must be a number",
  }),
  type: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Temporary")
    .required()
    .messages({
      "string.empty": "Job type is required",
      "any.only":
        "Job type must be one of the following values: Full-time, Part-time, Contract, Temporary",
    }),
  experience: Joi.string()
    .valid("Entry level", "Mid level", "Senior level")
    .required()
    .messages({
      "string.empty": "Job experience level is required",
      "any.only":
        "Job experience level must be one of the following values: Entry level, Mid level, Senior level",
    }),
  skill: Joi.array()
    .items(Joi.string().trim().pattern(new RegExp("[a-zA-Z0-9 ]{2,30}")))
    .required()
    .min(1)
    .max(10)
    .messages({
      "array.empty": "Job skills are required",
      "array.min": "At least one job skill is required",
      "array.max": "No more than 10 job skills are allowed",
      "string.pattern.base":
        "Job skills must be between 2 and 30 characters and can contain letters, numbers, and spaces only",
    }),
  createdby: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp("[0-9a-fA-F]{24}"))
    .messages({
      "string.empty": "Created by user ID is required",
      "string.pattern.base":
        "Created by user ID must be a valid MongoDB ObjectID",
    }),
});
module.exports = jobValidationSchema;

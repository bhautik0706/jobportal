const Joi = require("joi");
const constant = require("./../utils/constant");
const schema = Joi.object({
  applicantname: Joi.string().required().pattern(new RegExp("[0-9a-fA-F]{24}")).messages({
    "any.required": "Applicant name is required.",
    "string.empty": "Applicant name must not be empty.",
    "string.pattern.base":
        "Applicant Name must be a valid MongoDB ObjectID",
  }),
  jobname: Joi.string().required().pattern(new RegExp("[0-9a-fA-F]{24}")).messages({
    "any.required": "Job name is required.",
    "string.empty": "Job name must not be empty.",
    "string.pattern.base":
    "Job Name must be a valid MongoDB ObjectID",
  }),
  resume: Joi.string().messages({
    "any.required": "Resume is required.",
    "string.empty": "Resume must not be empty.",
  }),
  phonenumber: Joi.string()
    .required()
    .pattern(new RegExp("^[0-9]{10}$"))
    .messages({
      "any.required": "Phone number is required.",
      "string.empty": "Phone number must not be empty.",
      "string.pattern.base": "Phone number must be a 10-digit number.",
    }),
  coverletter: Joi.string().required().messages({
    "any.required": "Cover letter is required.",
    "string.empty": "Cover letter must not be empty.",
  }),
  status: Joi.string()
    .valid(
      constant.REVIEW_STATUS.REVIEW_STATUS_PENDING,
      constant.REVIEW_STATUS.REVIEW_STATUS_REJECT,
      constant.REVIEW_STATUS.REVIEW_STATUS_INTERVIEW
    )
    .messages({
      "any.only": "Invalid status value.",
    }),
  active: Joi.number()
    .valid(constant.ACTIVE_STATUS.ACTIVE, constant.ACTIVE_STATUS.INACTIVE)
    .messages({
      "any.only": "Invalid active value.",
    }),
});

module.exports = schema;

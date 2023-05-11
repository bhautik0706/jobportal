const mongoose = require("mongoose");
const authValidation = require("./../validation/authValidation");
const jobValidation = require("./../validation/jobValidation");
const jobUpdateValidation = require("./../validation/jobUpdateValidation");
const userUpdateValidation = require("./../validation/userUpdateValidation");
const applicantionValidation = require("./../validation/applicationValidation");
const validateUserSchema = (req, res, next) => {
  const { error } = authValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  next();
};

const jobValidationSchema = (req, res, next) => {
  const { error } = jobValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  next();
};

const jobupdateValidationSchema = (req, res, next) => {
  const { error } = jobUpdateValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  next();
};

const updateUserValidationSchema = (req, res, next) => {
  const { error } = userUpdateValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  next();
};

const appValidation = (req, res, next) => {
  const { error } = applicantionValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  next();
};

const handleUserNotFound = (req, res, next) => {
  const err = res.status(404).json({ error: true, message: "User Not Found" });
  next(err);
};

const handleApplyJobNotFound = (req, res, next) => {
  const err = res
    .status(404)
    .json({ error: true, message: "ApplyJob Not Found" });
  next(err);
};
const handleJobNotFound = (req, res, next) => {
  const err = res.status(404).json({ error: true, message: "Job Not Found" });
  next(err);
};

const handleInvalidId = (req, res, next) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(403).json({ error: true, message: "Your id is invalid" });
  }
};

module.exports = {
  validateUserSchema,
  handleUserNotFound,
  handleInvalidId,
  handleApplyJobNotFound,
  jobValidationSchema,
  handleJobNotFound,
  jobupdateValidationSchema,
  updateUserValidationSchema,
  appValidation,
};

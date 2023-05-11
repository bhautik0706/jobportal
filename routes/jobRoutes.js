const express = require("express");
const router = express.Router();
const jobController = require("./../controller/jobController");
const { isAuthenticated } = require("./../controller/authController");
const globalError = require("./../utils/errorHandler");
const { isEmployee } = require("./../controller/authController");

router
  .route("/")
  .post(
    globalError.jobValidationSchema,
    isAuthenticated,
    isEmployee,
    jobController.postJob
  )
  .get(isAuthenticated, jobController.searchJob);


router
  .route("/review")
  .get(isAuthenticated, isEmployee, jobController.getAllReviewApplication);
router
  .route("/:id")
  .patch(
    globalError.jobupdateValidationSchema,
    isAuthenticated,
    isEmployee,
    jobController.updatePostJob
  )
  .get(isAuthenticated, isEmployee, jobController.reviewApplication)
  .delete(isAuthenticated, isEmployee, jobController.deleteJob);

router
  .route("/:id/review")
  .patch(isAuthenticated, isEmployee, jobController.updateReviewApplication);
module.exports = router;

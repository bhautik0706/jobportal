const express = require("express");
const router = express.Router();
const applicationController = require("./../controller/applicationController");
const globalError = require("./../utils/errorHandler");
const { isAuthenticated } = require("./../controller/authController");
const upload = require("./../utils/multer");
router
  .route("/apply")
  .post(
    upload.single("image"),
    globalError.appValidation,
    isAuthenticated,
    applicationController.applyJob
  );
router.route("/").get(isAuthenticated, applicationController.getAllApplication);
router
  .route("/:id")
  .get(isAuthenticated, applicationController.getApplyJobById)
  .delete(isAuthenticated, applicationController.deleteApplyJob);
router
  .route("/:id/status")
  .get(isAuthenticated, applicationController.applicationStatus);

module.exports = router;

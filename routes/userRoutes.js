const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");
const globalError = require("./../utils/errorHandler");
const { isAuthenticated } = require("./../controller/authController");
router
  .route("/")
  .post(globalError.validateUserSchema, authController.signUp)
  .get(isAuthenticated, userController.getAllUser)
  .get(authController.protected);

router.route("/protected").get(authController.protected);
router
  .route("/login")
  .post(globalError.validateUserSchema, authController.login);
router.route("/verify").post(authController.verifytoken);
router.route("/logout").get(authController.logout);

router
  .route("/:id")
  .get(isAuthenticated, userController.getUserById)
  .patch(
    globalError.updateUserValidationSchema,
    isAuthenticated,
    userController.updateUser
  )
  .delete(isAuthenticated, userController.deleteUser);
module.exports = router;

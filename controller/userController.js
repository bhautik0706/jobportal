const express = require("express");
const mongoose = require("mongoose");
const { message } = require("../validation/authValidation");
const userModel = require("./../model/userModel");
const globalError = require("./../utils/errorHandler");
const responceHandler = require("./../utils/responseHandler");
const apiFethure = require("./../utils/apiFethure");
const APIFeatures = require("./../utils/apiFethure");
exports.getAllUser = async (req, res, next) => {
  try {
    let filter = {};
    const features = new APIFeatures(userModel.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    const message = "Success";
    if (doc.length === 1) {
      responceHandler.sendSuccessResponce(res, message, doc);
    } else {
      const user = await userModel.find({ active: 1 });
      if (user.length === 0) {
        globalError.handleUserNotFound(req, res, next);
      }
      responceHandler.sendSuccessResponce(res, message, user);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const user = await userModel.findById(id);
      if (!user) {
        globalError.handleUserNotFound(req, res, next);
      }
      responceHandler.sendSuccessResponce(res, message, user);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateUser) {
        return globalError.handleUserNotFound(req, res, next);
      }
      const message = "Your changes has been Successfully saved";
      responceHandler.sendSuccessResponce(res, message, updateUser);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const user = await userModel.findByIdAndUpdate(id, { active: 0 });
      if (!user) {
        return globalError.handleUserNotFound(req, res, next);
      }
      const message = "User deleted successfully";
      responceHandler.sendSuccessResponce(res, message, user);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

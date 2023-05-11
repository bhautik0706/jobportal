const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const applicationModel = require("./../model/jobApplyModel");
const responceHandler = require("./../utils/responseHandler");
const globalError = require("./../utils/errorHandler");
const APIFeatures = require("./../utils/apiFethure");
const Resume = require("./../model/resumeModel");

exports.applyJob = async (req, res) => {
  try {
    const { originalname, path, mimetype, size } = req.file;
    const resume = new Resume({
      name: originalname,
      path: path,
      extension: mimetype.split("/")[1],
      size: size,
    });
    await resume.save();
    const { applicantname, jobname, phonenumber, coverletter } = req.body;
    const applicantion = new applicationModel({
      applicantname,
      jobname,
      resume: resume._id,
      phonenumber,
      coverletter,
    });
    await applicantion.save();
    const message = "Application submited successfully";
    return responceHandler.sendSuccessResponce(res, message, applicantion);
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.getAllApplication = async (req, res, next) => {
  try {
    let filter = {};
    const features = new APIFeatures(applicationModel.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const message = "Success";
    const doc = await features.query;
    if (doc.length === 1) {
      responceHandler.sendSuccessResponce(res, message, doc);
    } else {
      const application = await applicationModel
        .find({ active: 1 })
        .populate("applicantname")
        .populate("jobname");
      if (application.length === 0) {
        globalError.handleApplyJobNotFound(req, res, next);
      }
      const message = "suucess";
      responceHandler.sendSuccessResponce(res, message, application);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.getApplyJobById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const applicantion = await applicationModel.findById(id);
      if (!applicantion) {
        globalError.handleApplyJobNotFound(req, res, next);
      }
      const message = "success";
      responceHandler.sendSuccessResponce(res, message, applicantion);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.deleteApplyJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const applicantion = await applicationModel.findByIdAndUpdate(id, {
        active: 0,
      });
      if (!applicantion) {
        return globalError.handleApplyJobNotFound(req, res, next);
      }
      const message = "Apply Job deleted successfully";
      responceHandler.sendSuccessResponce(res, message, applicantion);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.applicationStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const applicantion = await applicationModel
        .findById(id)
        .populate("applicantname")
        .populate("jobname");
      if (!applicantion) {
        globalError.handleApplyJobNotFound(req, res, next);
      }
      const message = "success";
      responceHandler.sendSuccessResponce(res, message, applicantion);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

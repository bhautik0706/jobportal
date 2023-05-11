const express = require("express");
const mongoose = require("mongoose");
const { message } = require("../validation/authValidation");
const jobModel = require("./../model/jobModel");
const responceHandler = require("./../utils/responseHandler");
const globalError = require("./../utils/errorHandler");
const applicationModel = require("./../model/jobApplyModel");

exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      type,
      experience,
      skill,
      createdby,
    } = req.body;
    const job = new jobModel({
      title,
      description,
      company,
      location,
      salary,
      type,
      experience,
      skill,
      createdby,
    });
    await job.save();
    const message = "Job Posting created Successfully";
    responceHandler.sendSuccessResponce(res, message, job);
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.searchJob = async (req, res) => {
  try {
    const { q, location, type, experience } = req.query;
    const query = {
      title: { $regex: String(q), $options: "i" },
      location: { $regex: String(location), $options: "i" },
      type: type || { $in: ["fulltime", "parttime", "contract", "temporary"] },
      experience: experience || {
        $in: ["entryleval", "midlevel", "seniorlevel"],
      },
    };
    if (!query) {
      res.status(404).json({ message: "This type of job not avilable" });
    } else {
      const jobs = await jobModel.find(query).populate("createdby");
      responceHandler.sendSuccessResponce(res, message, jobs);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.updatePostJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const updateJob = await jobModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateJob) {
        return globalError.handleJobNotFound(req, res, next);
      }
      const message = "Your changes has been Successfully saved";
      responceHandler.sendSuccessResponce(res, message, updateJob);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const jobDelete = await jobModel.findByIdAndUpdate(id, { active: 0 });
      if (!jobDelete) {
        return globalError.handleJobNotFound(req, res, next);
      }
      const message = "Job deleted successfully";
      responceHandler.sendSuccessResponce(res, message, jobDelete);
    }
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};

exports.getAllReviewApplication = async (req, res, next) => {
  try {
    const application = await applicationModel
      .find({ active: 1 })
      .populate("applicantname")
      .populate("jobname");
    if (application.length === 0) {
      globalError.handleApplyJobNotFound(req, res, next);
    }
    const message = "suucess";
    responceHandler.sendSuccessResponce(res, message, application);
  } catch (error) {
    responceHandler.sendErrorResonce(res, error);
  }
};
exports.reviewApplication = async (req, res, next) => {
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

exports.updateReviewApplication = async (req, res, next) => {
  const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return globalError.handleInvalidId(req, res, next);
    } else {
      const updateApplication = await applicationModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateApplication) {
        return globalError.handleJobNotFound(req, res, next);
      }
      const message = "Your changes has been Successfully saved";
      responceHandler.sendSuccessResponce(res, message, updateApplication);
    }
}
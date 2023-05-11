const { link } = require("joi");
const mongoose = require("mongoose");
const constant = require("./../utils/constant");

const jobApplySchema = mongoose.Schema(
  {
    applicantname: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    jobname: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
    phonenumber: {
      type: String,
      require: true,
    },
    coverletter: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: [
        constant.REVIEW_STATUS.REVIEW_STATUS_PENDING,
        constant.REVIEW_STATUS.REVIEW_STATUS_REJECT,
        constant.REVIEW_STATUS.REVIEW_STATUS_INTERVIEW,
      ],
      default: constant.REVIEW_STATUS.REVIEW_STATUS_PENDING,
    },
    active: {
      type: Number,
      enum: [constant.ACTIVE_STATUS.ACTIVE, constant.ACTIVE_STATUS.INACTIVE],
      default: constant.ACTIVE_STATUS.ACTIVE,
      select: false,
    },
  },
  { timestamps: true }
);

const application = mongoose.model("application", jobApplySchema);
module.exports = application;

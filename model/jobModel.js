const mongoose = require("mongoose");
const constant = require("./../utils/constant");

const jobSchema = new mongoose.Schema(
  {
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        constant.JOB_TYPE.FULL_TIME,
        constant.JOB_TYPE.PART_TIME,
        constant.JOB_TYPE.CONTRACT,
      ],
      required: true,
    },
    experience: {
      type: String,
      enum: [
        constant.JOB_EXP.ENTRY_LEVEL,
        constant.JOB_EXP.MID_LEVEL,
        constant.JOB_EXP.SENIOR_LEVEL,
      ],
      required: true,
    },
    skill: {
      type: [String],
      required: true,
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

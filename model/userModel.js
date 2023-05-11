const mongoose = require("mongoose");
const constant = require("./../utils/constant");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [constant.ROLE.ROLE_EMP, constant.ROLE.ROLE_JOBSEEKER],
      default: constant.ROLE.ROLE_JOBSEEKER,
    },
    secret: {
      type: String,
      require: true,
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

const User = mongoose.model("User", userSchema);
module.exports = User;

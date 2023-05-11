const mongoose = require("mongoose");
const jobIndeed = mongoose.Schema({
  title: { type: String },
  company: { type: String },
  location: { type: String },
  description: { type: String },
  url: { type: String },
});

const Indeed = mongoose.model("Indeed", jobIndeed);
module.exports = Indeed;

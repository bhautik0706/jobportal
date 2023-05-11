const { message } = require("../validation/authValidation");

exports.sendCreateResponce = (res, message, data) => {
  res.status(201).json({ error: false, message, data });
};

exports.sendSuccessResponce = (res, message, data) => {
  res.status(200).json({ error: false, message, data });
};

exports.sendErrorResonce = (res, error, status = 500) => {
  res.status(status).json({
    error: true,
    message: error.message,
  });
};

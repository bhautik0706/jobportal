const express = require("express");
const userModel = require("./../model/userModel");
const bycrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const responceHandler = require("./../utils/responseHandler");
const session = require("express-session");
const { use } = require("../app");

exports.signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { base32: secret } = speakeasy.generateSecret();
    const hashedPassword = await bycrypt.hash(password, 10);

    if (await userModel.findOne({ email: req.body.email })) {
      res.status(403).json({
        error: true,
        message: "This email alredy Exist",
      });
    } else {
      const user = new userModel({
        email,
        password: hashedPassword,
        role,
        secret,
      });
      await user.save();
      const message = "Your account has been successfully created";
      return responceHandler.sendCreateResponce(res, message, user);
    }
  } catch (error) {
    return responceHandler.sendErrorResonce(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: true, message: "Invalid Email" });
    }
    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: true, message: "Invalid Password" });
    }
    const token = speakeasy.totp({
      secret: user.secret,
      encoding: "base32",
    });
    res.status(200).json({
      error: false,
      message: "Please Enter verification code for verify",
      email,
      token: token,
    });
    req.session.token = token;
    req.session.email = user.email;
    console.log(token);
    console.log(req.session.email);
  } catch (error) {
    return responceHandler.sendErrorResonce(res, error);
  }
};

exports.verifytoken = async (req, res, next) => {
  try {
    const { email, token } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: true, message: "Invalid Email" });
    }
    const validToken = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "base32",
      token,
    });
    if (!validToken) {
      return res.status(401).json({ error: true, message: "Invalid Token" });
    }
    req.session.user = user;
    res
      .status(200)
      .json({ error: false, message: "Verification Successfully" });
    next();
  } catch (error) {
    return responceHandler.sendErrorResonce(res, error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.user = null;
    res.status(200).json({ error: false, message: "Logout Succssfull" });
  } catch (error) {
    return responceHandler.sendErrorResonce(res, error);
  }
};

exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({
      error: true,
      message: "You need to log in to access this resource",
    });
  }
};

exports.isEmployee = (req, res, next) => {
  const user = req.session.user;
  if (user.role === "employeer") {
    return next();
  } else {
    return res.status(401).json({
      error: true,
      message: "You need to not in to access this resource",
    });
  }
};

exports.protected = (req, res) => {
  const user = req.session.user;

  // Check if the user is authenticated
  if (!user) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  res.send(`You are authenticated as ${user.email}!`);
};

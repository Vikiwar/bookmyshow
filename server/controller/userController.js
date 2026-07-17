const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utlis/emailHelper");
const bcrypt = require("bcrypt");

const otpGenerator = function () {
  return Math.floor(100000 + Math.random() * 900000);
};

const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        sucess: false,
        message: "User already exists",
      });
    }
    const saltRounds = 10; // the higher the number, the more secure but slower the hashing process
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("User registered successfully:", newUser);
    res.send({
      success: true,
      message: "Registration Successfull, Please login",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register.",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({
      success: true,
      message: "You've successfully logged in!",
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  res.send({
    success: true,
    message: "you are authorized user",
    data: user,
  });
};

const forgetPassword = async (req, res) => {
  try {
    if (req.body.email == undefined) {
      return res.status(401).json({
        status: "failure",
        message: "Please enter the email for forget Password",
      });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(404).json({
        status: "failure",
        message: "user not found for this email",
      });
    }
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    // those updates will be send to the db
    await user.save();
    await EmailHelper("otp.html", user.email, {
      name: user.name,
      otp: otp,
    });
    res.status(200).json({
      status: "success",
      message: "otp sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failure",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    let resetDetails = req.body;
    if (!resetDetails.password || !resetDetails.otp) {
      return res.status(401).json({
        status: "failure",
        message: "invalid request",
      });
    }

    const user = await User.findOne({ email: req.params.email });
    if (user == null) {
      return res.status(404).json({
        status: "failure",
        message: "user not found",
      });
    }

    if (String(user.otp) !== String(resetDetails.otp)) {
      return res.status(401).json({
        status: "failure",
        message: "invalid otp",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(401).json({
        status: "failure",
        message: "otp expired",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failure",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  forgetPassword,
  resetPassword,
};

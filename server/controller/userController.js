const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        sucess: false,
        message: "User already exists",
      });
    }
    const newUser = new User(req.body);
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

    if (req.body.password !== user.password) {
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

module.exports = { registerUser, loginUser, getCurrentUser };

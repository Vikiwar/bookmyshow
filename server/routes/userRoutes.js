const express = require("express");

const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  forgetPassword,
  resetPassword,
} = require("../controller/userController");
const auth = require("../middlewares/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", auth, getCurrentUser);
userRouter.patch("/forgetpassword", forgetPassword);
userRouter.patch("/reset/:email", resetPassword);

module.exports = userRouter;

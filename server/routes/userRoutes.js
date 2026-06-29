const express = require("express");

const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controller/userController");
const auth = require("../middlewares/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", auth, getCurrentUser);

module.exports = userRouter;

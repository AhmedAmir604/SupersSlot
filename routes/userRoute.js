import express from "express";
import {
  forgotPassword,
  isLoggedIn,
  login,
  logout,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController.js";

const userRoute = express.Router();

userRoute.get("/", isLoggedIn);
userRoute.post("/signup", signUp);
userRoute.post("/login", login);
userRoute.get("/logout", logout);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/resetPassword/:id", resetPassword);

export default userRoute;

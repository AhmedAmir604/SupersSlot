import express from "express";
import {
  forgotPassword,
  isLoggedIn,
  login,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController.js";

const userRoute = express.Router();

userRoute.get("/", isLoggedIn);
userRoute.post("/signup", signUp);
userRoute.post("/login", login);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/resetPassword/:id", resetPassword);

export default userRoute;

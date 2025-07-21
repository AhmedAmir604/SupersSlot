import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userSchema } from "../schemas/userSchema.js";
import Model from "./Models.js";

userSchema.pre("save", async function (next) {
  // isModified method run validators so that we dont get into trouble of defining this.confirmPassword undefined
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeTime = Date.now() - 1000;
  next();
});

userSchema.methods.isPasswordChanged = function (tokenTime) {
  if (this.passwordChangeTime) {
    const passwordChangedTimeInSec = parseInt(
      this.passwordChangeTime.getTime() / 1000,
      10
    );
    return passwordChangedTimeInSec > tokenTime;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
const userModel = new Model(User);

export default userModel;

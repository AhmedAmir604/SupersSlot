import Service from "./Service.js";
import userModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ErrorHandler from "../utils/appError.js";

class AuthService extends Service {
  constructor(userModel) {
    super(userModel);
  }

  async verifyPassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }

  async generatePasswordResetToken(user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetTokenExpiry = Date.now() + 600000; // 10 minutes
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    await user.save();
    return resetToken;
  }

  async findByToken(resetToken) {
    return await this.model.findOne({
      passwordResetToken: crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex"),
    });
  }

  async resetPassword(user, newPassword) {
    user.password = newPassword; // you may want to hash it here
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
  }

  //   async findAndVerify(email, candidatePassword) {
  //     const user = await this.model.getMy(email, "+password");
  //     console.log(candidatePassword, user[0].password);
  //     if (!(await bcrypt.compare(user[0].password, candidatePassword))) {
  //       return new ErrorHandler("Please Provide Valid credentials!", 400);
  //     } else {
  //       return true;
  //     }
  //   }

  isPasswordChanged(user, tokenTime) {
    return user.isPasswordChanged(tokenTime);
  }
}

const authService = new AuthService(userModel);

export default authService;

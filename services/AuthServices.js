import Service from "./Service.js";
import userModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import crypto from "crypto";

class AuthService extends Service {
  constructor(userModel) {
    this.model = userModel;
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
    return await this.model.getMy(
      crypto.createHash("sha256").update(resetToken).digest("hex")
    );
  }

  async resetPassword(user, newPassword) {
    user.password = newPassword; // you may want to hash it here
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
  }

  isPasswordChanged(user, tokenTime) {
    return user.isPasswordChanged(tokenTime);
  }
}

const authService = new AuthService(userModel);

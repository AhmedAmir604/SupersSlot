import { UserModel } from "./userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const authService = {
  async createUser(userData) {
    return await UserModel.createUser(userData);
  },

  async findUserByEmail(email) {
    return await UserModel.findUserByEmail(email);
  },

  async findById(id) {
    return await UserModel.findUserById(id);
  },

  async verifyPassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  },

  async generatePasswordResetToken(user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetTokenExpiry = Date.now() + 600000; // 10 minutes
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    await user.save();
    return resetToken;
  },

  async findByToken(resetToken) {
    return await UserModel.findUserByToken(
      crypto.createHash("sha256").update(resetToken).digest("hex")
    );
  },

  async resetPassword(user, newPassword) {
    user.password = newPassword; // you may want to hash it here
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
  },

  isPasswordChanged(user, tokenTime) {
    return user.isPasswordChanged(tokenTime);
  },

  // Add additional methods as needed...
};

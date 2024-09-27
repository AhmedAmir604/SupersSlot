import User from "../models/userModel.js";
import { authService } from "../services/authService.js";

class UserRepository {
  async createUser(user) {
    return await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async findOne(identifyer, selections = "") {
    return await User.findOne(identifyer).select(selections);
  }

  isPasswordChanged(user, tokenTime) {
    if (user.passwordChangeTime) {
      const passwordChangedTimeInSec = parseInt(
        user.passwordChangeTime.getTime() / 1000,
        10
      );
      return passwordChangedTimeInSec > tokenTime;
    }
    return false;
  }

  async generatePasswordResetToken(user, resetToken) {
    user.passwordResetTokenExpiry = new Date() + 600000;
    user.passwordResetToken = authService.hashToken(resetToken);
    await user.save({ validationBeforeSave: false });
    return;
  }

  async resetPassword(user, newPassword) {
    user.password = newPassword;
    user.passwordConfirm = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
    return true;
  }

  async findByToken(token) {
    return await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });
  }
}

export const userRepository = new UserRepository();

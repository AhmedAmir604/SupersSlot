import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/UserRepository.js";
import { promisify } from "util";
import crypto from "crypto";
import bcrypt from "bcryptjs/dist/bcrypt.js";

class AuthService {
  async createUser(user) {
    return await userRepository.createUser(user);
  }

  async verifyToken(token) {
    return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  }
  async findById(id) {
    return await userRepository.findById(id);
  }
  isPasswordChanged(user, tokenTime) {
    return userRepository.isPasswordChanged(user, tokenTime);
  }

  hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async generatePasswordResetToken(user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    //added 10 min expiry for reset Token
    await userRepository.generatePasswordResetToken(user, resetToken);
    return resetToken;
  }

  async findByToken(token) {
    return await userRepository.findByToken(token);
  }
  async resetPassword(user, newPassword) {
    return await userRepository.resetPassword(user, newPassword);
  }

  async findOne(identifyer, selections = "") {
    return await userRepository.findOne(identifyer, selections);
  }

  async verifyPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
}

export const authService = new AuthService();

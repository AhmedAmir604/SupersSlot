import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/UserRepository.js";
import { promisify } from "util";

class AuthService {
  async verifyToken(token) {
    return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  }
  async getUserFromId(id) {
    return await userRepository.findById(id);
  }
  isPasswordChanged(user, tokenTime) {
    return userRepository.isPasswordChanged(user, tokenTime);
  }
}

export const authService = new AuthService();

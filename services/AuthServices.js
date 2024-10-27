import Service from "./Service.js";
import userModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ErrorHandler from "../utils/appError.js";
import Email from "../utils/Email.js";

class AuthService extends Service {
  constructor(userModel) {
    super(userModel);
  }

  async createUser(data) {
    const user = await super.create(data);
    await new Email(user, null).sendWelcome();
    if (!user) {
      return false;
    }
    return user;
  }

  async verifyPassword(password, user) {
    return await bcrypt.compare(password, user.password);
  }

  async generatePasswordResetToken(user, url) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetTokenExpiry = Date.now() + 600000; // 10 minutes
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    await user.save();
    url += `/${resetToken}`;
    //Sending email for reset Password with link link will be check with frontend for now :)
    await new Email(user, url).sendPasswordResetLink();
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

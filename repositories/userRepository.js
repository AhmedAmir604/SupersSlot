import User from "../models/userModel.js";

class UserRepository {
  async findById(userId) {
    return await User.findById(userId);
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
}

export const userRepository = new UserRepository();

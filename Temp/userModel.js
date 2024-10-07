// UserModel.js
import User from "../schemas/userSchema.js"; // assuming userModel is the file with your mongoose schema
import { catchAsync } from "../controllers/errorController.js";
import ErrorHandler from "../utils/appError.js";

export const UserModel = {
  createUser: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ email }).select("+password");
  },

  findUserById: async (id) => {
    return await User.findById(id);
  },

  updateUser: async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  },

  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },
  findUserByToken: async (token) => {
    return await User.findOne({ passwordResetToken: token });
  },

  // Other methods as needed...
};

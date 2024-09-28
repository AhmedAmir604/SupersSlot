// userRepository.js
import User from "../models/userModel.js"; // assuming userModel is the file with your mongoose schema

export const UserRepository = {
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

  // Other methods as needed...
};

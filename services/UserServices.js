import Service from "./Service.js";
import userModel from "../models/UsersModel.js";

class UserService extends Service {
  constructor(Model) {
    super(Model);
  }
  async verifyUserRole(ids, roles) {
    const users = await userModel.find(
      {
        _id: { $in: ids },
      },
      "role name photo"
    );
    return users.filter((user) => !roles.includes(user.role));
  }
}

const userService = new UserService(userModel);

export default userService;

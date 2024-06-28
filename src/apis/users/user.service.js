import UserModel from "../../model/user.model";
import { hashPassword, hashPasswordSalt } from "../../service/hash.service";
import { UserIdentityService } from "../../service";

class UserService {
  constructor() {
    this.userModel = new UserModel();
    this.userIdentityService = new UserIdentityService();
  }

  async getUsers() {
    return await this.userModel.getAllUsers();
  }

  async getUserById(id) {
    return await this.userModel.getUserById(id);
  }

  async getUserByUsername(username) {
    return await this.userModel.getUserByUsername(username);
  }

  async createUser(user) {
    const { salt, passwordHashed } = hashPassword(user.password);
    user.salt = salt;
    user.password = passwordHashed;
    user.forgetPasswordToken = passwordHashed;
    return await this.userModel.createUser(user);
  }

  async updateUser(id, user) {
    const { salt, passwordHashed } = hashPassword(user.PASSWORD);
    user.SALT = salt;
    user.PASSWORD = passwordHashed;
    user.FORGET_PASSWORD_TOKEN = passwordHashed;
    console.log('user ơ service', user);
    return await this.userModel.updateUser(id, user);
  }

  async deleteUser(id) {
    return await this.userModel.deleteUser(id);
  }
}

export default new UserService();

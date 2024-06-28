import Database from "../database/query.js";

class UserModel {
  constructor() {
    this.db = new Database();
  }

  async getAllUsers() {
    return await this.db.select('SELECT * FROM USERS');
  }

  async getUserById(id) {
    const users = await this.db.select('SELECT * FROM USERS WHERE ID = ?', [id]);
    return users[0];
  }

  async createUser(user) {
    const data = {
      NAME: user.name,
      GENDER: user.gender,
      USERNAME: user.username,
      AGE: user.age,
      PASSWORD: user.password,
      EMAIL: user.email,
      SALT: user.salt,
      FORGET_PASSWORD_TOKEN: user.forgetPasswordToken
    };
    return await this.db.insert('USERS', data);
  }

  async getUserByUsername(username) {
    const users = await this.db.select('SELECT * FROM USERS WHERE USERNAME = ?', [username]);
    return users[0];
  }

  async getUserByEmail(email) {
    const users = await this.db.select('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
    return users[0];
  }

  async updateUser(id, user) {
    const data = {
      NAME: user.NAME,
      GENDER: user.GENDER,
      USERNAME: user.USERNAME,
      AGE: user.AGE,
      PASSWORD: user.PASSWORD,
      EMAIL: user.EMAIL,
      SALT: user.SALT,
      FORGET_PASSWORD_TOKEN: user.FORGET_PASSWORD_TOKEN
    };
    return await this.db.update('USERS', data, 'ID = ?', [id]);
  }

  async updatePassword(id, hashedPassword) {
    const data = {
      PASSWORD: hashedPassword
    };
    return await this.db.update('USERS', data, 'ID = ?', [id]);
  
  }

  async deleteUser(id) {
    return await this.db.delete('USERS', 'ID = ?', [id]);
  }
}

export default UserModel;

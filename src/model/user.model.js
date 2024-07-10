import Database from "../database/query.js";

class UserModel {
  constructor() {
    this.db = new Database();
  }

  async getAllUsers() {
    try {
      return await this.db.select('SELECT * FROM USERS');
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      const users = await this.db.select('SELECT * FROM USERS WHERE ID = ?', [id]);
      return users[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(user) {
    try {
      const data = {
        NAME: user.name,
        GENDER: user.gender,
        USERNAME: user.username,
        AGE: user.age,
        PASSWORD: user.password,
        EMAIL: user.email,
        SALT: user.salt,
        FORGET_PASSWORD_TOKEN: user.forgetPasswordToken,
        AVATAR: user.avatar,
      };

      return await this.db.insert('USERS', data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByUsername(username) {
    try {
      const users = await this.db.select('SELECT * FROM USERS WHERE USERNAME = ?', [username]);
      return users[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const users = await this.db.select('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
      return users[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const users = await this.db.select('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
      return users[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id, user) {
    try {
      const data = {
        NAME: user.NAME,
        GENDER: user.GENDER,
        USERNAME: user.USERNAME,
        AGE: user.AGE,
        PASSWORD: user.PASSWORD,
        EMAIL: user.EMAIL,
        SALT: user.SALT,
        FORGET_PASSWORD_TOKEN: user.FORGET_PASSWORD_TOKEN,
        AVATAR: user.AVATAR,
      };

      return await this.db.update('USERS', data, 'ID = ?', [id]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePassword(id, hashedPassword, salt) {
    try {
      const data = {
        SALT: salt,
        PASSWORD: hashedPassword,
        FORGET_PASSWORD_TOKEN : null,
        FORGET_PASSWORD_TOKEN_EXPIRATION: null,
      };

      return await this.db.update('USERS', data, 'ID = ?', [id]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      return await this.db.delete('USERS', 'ID = ?', [id]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePasswordResetToken(userId, resetToken, expiration) {
    try {
      const data = {
        FORGET_PASSWORD_TOKEN: resetToken,
        FORGET_PASSWORD_TOKEN_EXPIRATION: expiration
      };

      return await this.db.update('USERS', data, 'ID = ?', [userId]);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserModel;

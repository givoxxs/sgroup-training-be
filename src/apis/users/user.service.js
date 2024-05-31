import pool from '../../config/dbConfig';
class UserService {
    // get All Users
    async getUsers() {
        const [rows, fields] = await pool.query('SELECT * FROM users');
        return rows;
    }
    // get User by Id
    async getUserById(id) {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        console.log("user: ", rows[0]);
        return rows[0];
    }
    // create new user 
    async createUser(newUser) {
        const result = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [newUser.name, newUser.email]);
        newUser.id = result[0].insertId;
        return newUser;
    }
    // update user
    async updateUser(id, userUpdate) {
        await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [userUpdate.name, userUpdate.email, id]);
    }
    // delete user
    async deleteUser(id) {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

export default new UserService();
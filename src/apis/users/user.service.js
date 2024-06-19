import pool from '../../config/dbConfig';
class UserService {
    // get All Users
    async getUsers() {
        const [rows, fields] = await pool.query('SELECT * FROM user');
        return rows;
    }
    // get User by Id
    async getUserById(id) {
        const [rows, fields] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        console.log("user: ", rows[0]);
        return rows[0];
    }
    // create new user 
    async createUser(newUser) {
        const result = await pool.query('INSERT INTO user (name, email, password, gender, age) VALUES (?, ?, ?, ?, ?)', [newUser.name, newUser.email, newUser.password, newUser.gender, newUser.age]);
        newUser.id = result[0].insertId;
        return newUser;
    }
    // update user
    async updateUser(id, userUpdate) {
        await pool.query('UPDATE user SET name = ?, email = ?, password = ?, gender = ?, age = ? WHERE id = ?', [newUser.name, newUser.email, newUser.password, newUser.gender, newUser.age]);
    }
    // delete user
    async deleteUser(id) {
        await pool.query('DELETE FROM user WHERE id = ?', [id]);
    }
}

export default new UserService();
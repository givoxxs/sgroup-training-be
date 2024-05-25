// ReadUser from ./users.json
import fs from 'fs';

const USERS_FILE = './users.json';

class UsersDao {
    //Read data from users.json
    readUsers() {
        const users = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(users);
    }
    // Write data users to file
    writeUsers = (users) => {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    }
}

export default new UsersDao();

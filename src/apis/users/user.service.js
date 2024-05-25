import fs from 'fs';
import UsersDao from '../../service/UsersDao';

class UserService {
    // get All Users
    getUsers() {
        const users = UsersDao.readUsers();
        return users;
    }
    // get User by Id
    getUserById(id) {
        let users = this.getUsers();
        console.log("id: ", id)
        const index = users.findIndex(user => user.id === parseInt(id))
        console.log("users: ", users[index])
        return users[index];
    }
    // create new user 
    createUser(newUser) {
        let users = this.getUsers();
        users.sort((a, b) => a.id - b.id);
        const lastId = users.length ? users[users.length - 1].id + 1 : 1;
        newUser.id = lastId;
        users.push(newUser);
        UsersDao.writeUsers(users)
    }
    // update user
    updateUser(id, userUpdate) {
        let users = this.getUsers();
        const index = users.findIndex(user => user.id === parseInt(id))
        users[index] = userUpdate;
        UsersDao.writeUsers(users);
    }
    // delete user
    deleteUser(id) {
        let users = this.getUsers();
        const index = users.findIndex(user => user.id === parseInt(id))
        users.splice(index, 1);
        UsersDao.writeUsers(users);
    }
}

export default new UserService();
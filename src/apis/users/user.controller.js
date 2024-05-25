import userService from "./user.service";

class UserController {
    // get all users
    getAllUsers(req, res, next) {
        const users = userService.getUsers();
        return res.status(200).json(users);
    }
    // get users by id
    getUserById(req, res, next) {
        const id = parseInt(req.params.id);
        const user = userService.getUserById(id);
        if (user != null) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User does not exist.' });
        }
    }
    createUser(req, res, next) {
        const newUser = {
            id : -1,
            name: req.body.name,
            email: req.body.email
        }
        userService.createUser(newUser);
        return res.status(201).json(newUser);
    }
    updateUser(req, res, next) {
        const id = parseInt(req.params.id);
        
        let user = userService.getUserById(id);
        if (user == null) {
            res.status(404).json({ message: 'User does not exist.' });
        }

        user = {
            ...user,
            name: req.body.name,
            email: req.body.email
        };
        
        userService.updateUser(id, user);
        return res.json(user);
    }
    deleteUser(req, res, next) {
        const id = parseInt(req.params.id);
        let user = userService.getUserById(id);
        if (user == null) {
            res.status(404).json({ message: 'User does not exist.' });
        }
        userService.deleteUser(id);
        return res.status(204).send();
    }
}

export default new UserController();
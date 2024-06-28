import userService from "./user.service";

class UserController {
    // get all users
    async getAllUsers(req, res, next) {
        try {
          const users = await userService.getUsers();
          return res.status(200).json(users);
        } catch (error) {
          next(error);
        }
      }
    // get users by id
    async getUserById(req, res, next) {
        try {
          const id = parseInt(req.params.id);
          const user = await userService.getUserById(id);
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(404).json({ message: 'User does not exist.' });
          }
        } catch (error) {
          next(error);
        }
    }
    async createUser(req, res, next) {
        try {
            const newUser = {
              name: req.body.name,
              gender: req.body.gender,
              username: req.body.username,
              age: req.body.age,
              password: req.body.password,
              email: req.body.email,
            };
            const existingUser = await userService.getUserByUsername(newUser.username);
            if (existingUser) {
              return res.status(400).json({ message: 'Username already exists.' });
            }
            await userService.createUser(newUser);
            return res.status(201).json(newUser);
          } catch (error) {
            next(error);
          }
      
    }
    async updateUser(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            let user = await userService.getUserById(id);
            console.log('user find', user);
            if (!user) {
              return res.status(404).json({ message: 'User does not exist.' });
            }
      
            user = {
              ...user,
              NAME: req.body.name === undefined ? user.NAME : req.body.name,
              GENDER: req.body.gender === undefined  ? user.GENDER : req.body.gender,
              USERNAME: req.body.username === undefined  ? user.USERNAME : req.body.username,
              AGE: req.body.age === undefined  ? user.AGE : req.body.age,
              PASSWORD: req.body.password === undefined  ? user.PASSWORD : req.body.password,
              EMAIL: req.body.email === undefined  ? user.EMAIL : req.body.email,
            };
            console.log('user controller', user)

            const existingUser = await userService.getUserByUsername(user.username);
            if (existingUser) {
              return res.status(400).json({ message: 'Username already exists.' });
            }
      
            await userService.updateUser(id, user);
            return res.json(user);
          } catch (error) {
            next(error);
          }
    }
    async deleteUser(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.getUserById(id);
            if (!user) {
              return res.status(404).json({ message: 'User does not exist.' });
            }
            await userService.deleteUser(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
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
              email: req.body.email
            };
            const createdUser = await userService.createUser(newUser);
            return res.status(201).json(createdUser);
          } catch (error) {
            next(error);
          }
      
    }
    async updateUser(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            let user = await userService.getUserById(id);
            if (!user) {
              return res.status(404).json({ message: 'User does not exist.' });
            }
      
            user = {
              ...user,
              name: req.body.name,
              email: req.body.email
            };
      
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
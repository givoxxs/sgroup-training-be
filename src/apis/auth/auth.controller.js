import AuthService from './auth.service';
import userService from '../users/user.service';

class AuthController {
    login = async(req, res, next) => {
        console.log("vao login ne");
        const { username, password } = req.body;
        console.log({username, password})
        const token = await AuthService.login({username, password})
        if (token == null) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        return res.status(200).json({ token });
    }
    register = async(req, res, next) => {
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
    forgotPassword = async (req, res, next) => {
      console.log("vao forgotPassword ne");
      const email = req.body.email;
      console.log(email);
      const result = await AuthService.forgotPassword(email);
      if (result.status !== 200) {
          return res.status(401).json({ message: result.message });
      }
      return res.status(200).json({ message: 'Reset token sent to email.' });
    }

    resetPassword = async (req, res, next) => {
      console.log("vao resetPassword ne");
      const { token, password } = req.body;
      console.log({ token, password });
      const result = await AuthService.resetPassword(token, password);
      if (result.status !== 200) {
          return res.status(401).json({ message: result.message });
      }
      return res.status(200).json({ message: 'Password has been reset.' });
    }
}

export default new AuthController();
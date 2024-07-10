import AuthService from './auth.service';
import userService from '../users/user.service';

class AuthController {
    login = async(req, res, next) => {
        try {
          const { username, password } = req.body;
          const { user, token} = await AuthService.login({username, password})
          if (token == null) {
              return res.status(401).json({ message: 'Invalid username or password.' });
          }
          return res.status(200).json({ token });
        } catch (error) {
          next(error);
        }
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
            const existingEmail = await userService.getUserByEmail(newUser.email);
            if (existingUser || existingEmail) {
              return res.status(409).json({ message: 'Username or email already exists.' });
            }
            await userService.createUser(newUser);
            return res.status(201).json("Created User");
          } catch (error) {
            next(error);
          }
    }
    forgotPassword = async (req, res, next) => {
      try {
        const email = req.body.email;
        const result = await AuthService.forgotPassword(email);
        if (result.status !== 200) {
            return res.status(401).json({ message: result.message });
        }
        return res.status(200).json({ message: 'Reset token sent to email.' });
      } catch (error) {
        next(error);
      }
    }

    resetPassword = async (req, res, next) => {
      try {
        const token = req.query.token;
        const { password } = req.body;
        const result = await AuthService.resetPassword(token, password);
        if (result.status !== 200) {
            return res.status(401).json({ message: result.message });
        }
        return res.status(200).json({ message: 'Password has been reset.' });
      } catch (error) {
        next(error);
      }
    }
}

export default new AuthController();
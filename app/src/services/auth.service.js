import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcript from "bcryptjs";

class AuthService {
  userModel = null;

  constructor() {
    this.userModel = new UserModel();
  }

  async register(req) {
    try {
      const { name, lastName, email, password } = req.body;

      if (!(name && lastName && email && password)) {
        return { statusCode: 400, message: "All inputs are required" };
      }

      const user = await this.userModel.createUser({
        name,
        lastName,
        email,
        password,
      });

      if (user.error) {
        return { statusCode: 400, message: user.error };
      }

      const token = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.TOKEN,
        { expiresIn: "2h" }
      );

      user.token = token;

      return {
        statusCode: 200,
        message: "User registered successfully",
        user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(req) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return { statusCode: 400, message: "All inputs are required" };
      }

      const user = await this.userModel.findUser(email);

      if (!user) {
        return { statusCode: 400, message: "User does not exist" };
      }

      const isPassword = await bcript.compare(password, user.password);

      if (isPassword) {
        const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKEN,
          { expiresIn: "2h" }
        );

        user.token = token;

        return {
          statusCode: 200,
          message: "User logged successfully",
          user,
        };
      } else {
        return {
          statusCode: 400,
          message: "Verify email or password",
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;

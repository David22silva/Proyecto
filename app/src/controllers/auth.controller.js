import AuthService from "../services/auth.service.js";

const authService = new AuthService();

export const registerController = async (req, res) => {
  const registerResult = await authService.register(req);
  res.status(registerResult.statusCode).json(registerResult);
};

export const loginController = async (req, res) => {
  const loginResult = await authService.login(req);
  res.status(loginResult.statusCode).json(loginResult);
};

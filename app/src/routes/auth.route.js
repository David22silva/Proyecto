import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export default authRouter;

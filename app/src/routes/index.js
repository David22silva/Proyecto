import express from "express";
import authRouter from "./auth.route.js";
import todoRouter from "./todo.route.js";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/todos", todoRouter);

export default routes;

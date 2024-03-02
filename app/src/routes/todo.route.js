import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodosController,
  getTodoController,
  updateTodoController,
} from "../controllers/todo.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const todoRouter = express.Router();

todoRouter.use(verifyToken);

todoRouter.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

todoRouter.get("/getTodo", getTodoController);

todoRouter.get("/getAllTodos", getAllTodosController);

todoRouter.post("/createTodo", createTodoController);

todoRouter.put("/updateTodo", updateTodoController);

todoRouter.delete("/deleteTodo", deleteTodoController);

//update Route

//delete Route

export default todoRouter;

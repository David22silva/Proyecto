import TodoService from "../services/todo.service.js";

const todoService = new TodoService();

export const createTodoController = async (req, res) => {
  const createTodoResult = await todoService.createTodo(req);
  res.status(createTodoResult.statusCode).json(createTodoResult);
};

export const getAllTodosController = async (req, res) => {
  const getAllTodosResult = await todoService.getAllTodos(req);
  res.status(getAllTodosResult.statusCode).json(getAllTodosResult);
};

export const getTodoController = async (req, res) => {
  const getTodoResult = await todoService.getTodo(req);
  res.status(getTodoResult.statusCode).json(getTodoResult);
};

//Actividad CRUD (Create, Read, Update, Delete)

export const updateTodoController = async (req, res) => {
  const updateTodoResult = await todoService.updateTodo(req);
  res.status(updateTodoResult.statusCode).json(updateTodoResult);
};

export const deleteTodoController = async (req, res) => {
  const deleteTodoResult = await todoService.deleteTodo(req);
  res.status(deleteTodoResult.statusCode).json(deleteTodoResult);
};
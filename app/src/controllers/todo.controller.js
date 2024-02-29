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

const updateTodoController = () => {};

const deleteTodoController = () => {};

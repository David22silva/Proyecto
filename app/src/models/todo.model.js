import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

class TodoModel {
  __dirname = dirname(fileURLToPath(import.meta.url));
  filePath = join(this.__dirname, "../common/todoDataBase.txt");

  async createTodo(todoData, userData) {
    const exitingData = await fs.readFile(this.filePath, "utf-8");
    const existingTodos = JSON.parse(exitingData || "[]");

    todoData.id = uuidv4();
    todoData.completed = false;
    todoData.userId = userData["user_id"];

    existingTodos.push(todoData);

    await fs.writeFile(this.filePath, JSON.stringify(existingTodos));

    return todoData;
  }

  async findAllTodos(userId) {
    const exitingData = await fs.readFile(this.filePath, "utf-8");
    const existingTodos = JSON.parse(exitingData || "[]");

    const todos = existingTodos.filter((todo) => todo.userId === userId);

    if (todos.length) {
      return todos;
    } else {
      return { error: "User has not todos yet" };
    }
  }

  async findTodo(todoId) {
    const exitingData = await fs.readFile(this.filePath, "utf-8");
    const existingTodos = JSON.parse(exitingData || "[]");

    const todo = existingTodos.find((todo) => todo.id === todoId);

    if (todo) {
      return todo;
    } else {
      return { error: "Todo does not exist" };
    }
  }

  //Actividad CRUD (Create, Read, Update, Delete)

  
  async updateTodo(todoId, updatedTodoData) {
    const existingData = await fs.readFile(this.filePath, "utf-8");
    let existingTodos = JSON.parse(existingData || "[]");

    const index = existingTodos.findIndex((todo) => todo.id === todoId);

    if (index !== -1) {
      existingTodos[index] = { ...existingTodos[index], ...updatedTodoData };
      await fs.writeFile(this.filePath, JSON.stringify(existingTodos));
      return existingTodos[index];
    } else {
      return { error: "Todo does not exist" };
    }
  }

  async deleteTodo(todoId) {
    const existingData = await fs.readFile(this.filePath, "utf-8");
    let existingTodos = JSON.parse(existingData || "[]");

    const index = existingTodos.findIndex((todo) => todo.id === todoId);

    if (index !== -1) {
      const deletedTodo = existingTodos.splice(index, 1);
      await fs.writeFile(this.filePath, JSON.stringify(existingTodos));
      return deletedTodo[0];
    } else {
      return { error: "Todo does not exist" };
    }
  }
}

export default TodoModel;

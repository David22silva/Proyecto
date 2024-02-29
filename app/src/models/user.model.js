import fs from "fs/promises";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

class UserModel {
  __dirname = dirname(fileURLToPath(import.meta.url));
  filePath = join(this.__dirname, "../common/dataBase.txt");

  async createUser({ name, lastName, email, password }) {
    const exitingData = await fs.readFile(this.filePath, "utf-8");
    const existingUsers = JSON.parse(exitingData || "[]");

    const user = existingUsers.find((user) => user.email === email);

    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const userData = {
        id,
        firstName: name,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
      };

      existingUsers.push(userData);

      await fs.writeFile(this.filePath, JSON.stringify(existingUsers));

      return userData;
    } else {
      return { error: "Email already registered" };
    }
  }

  async findUser(email) {
    const exitingData = await fs.readFile(this.filePath, "utf-8");
    const existingUsers = JSON.parse(exitingData || "[]");

    const user = existingUsers.find((user) => user.email === email);

    if (!user) {
      return { error: "User does not exist" };
    } else {
      return user;
    }
  }

  //Actividad CRUD (Create, Read, Update, Delete)

  async getAllUser() {
    const exitingData = await fs.readFile(this.filePath, "utf-8");
    const existingUsers = JSON.parse(exitingData || "[]");

    return existingUsers;
  }

  updateUser(userId, data) {}

  delete(userId) {}
}

export default UserModel;

//Clases

// const userModel = new UserModel();
// const userModel2 = new UserModel();

// userModel.createUser({ user: "data" });

// userModel2.createUser({ user: "data 2" });

//functions

// async function createUser(data) {
//   return data;
// }

// const data = createUser({ user: "data" });

//Ejemplo

// class Persona {
//   name = null;
//   setName(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

// const persona1 = new Persona();
// persona1.setName("daniel");
// const persona2 = new Persona();
// persona2.setName("robin");

// console.log(persona1.getName());
// console.log(persona2.getName());

import express from "express";
import "dotenv/config";
import routes from "./src/routes/index.js";
import logger from "./src/middlewares/logger.middleware.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(logger);


app.use("/", routes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

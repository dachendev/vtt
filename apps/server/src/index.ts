import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import { mountRoutes } from "./mountRoutes";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/ping", (req, res) => {
  res.send("pong");
});

mountRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

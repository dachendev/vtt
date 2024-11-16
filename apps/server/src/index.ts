import express from "express";
import { userRoutes } from "./features/users";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = 3000;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

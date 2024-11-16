import { Express } from "express";
import { authRoutes, sessionRoutes } from "./features/auth";
import { userRoutes } from "./features/users";

export const mountRoutes = (app: Express) => {
  app.use(authRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/users", userRoutes);
};

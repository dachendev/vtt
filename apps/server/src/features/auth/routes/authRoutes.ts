import { Router } from "express";
import {
  getCurrentUser,
  loginWithCredentials,
} from "../controllers/authController";

export const authRoutes = Router();

authRoutes.post("/login", loginWithCredentials);
authRoutes.get("/users/me", getCurrentUser);

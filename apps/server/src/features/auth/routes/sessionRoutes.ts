import { Router } from "express";
import {
  getAllSessions,
  getSessionById,
  deleteSessionById,
} from "../controllers/sessionController";

export const sessionRoutes = Router();

sessionRoutes.get("/", getAllSessions);
sessionRoutes.get("/:id", getSessionById);
sessionRoutes.delete("/:id", deleteSessionById);

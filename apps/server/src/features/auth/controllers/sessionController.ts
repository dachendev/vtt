import { RequestHandler } from "express";
import { Session } from "../models/Session";

export const getAllSessions: RequestHandler = async (req, res) => {
  const sessions = await Session.findAll();
  res.send(sessions);
};

export const getSessionById: RequestHandler = async (req, res) => {
  const session = await Session.findByPk(req.params.id);
  if (!session) {
    res.sendStatus(404);
    return;
  }
  res.send(session);
};

export const deleteSessionById: RequestHandler = async (req, res) => {
  const session = await Session.findByPk(req.params.id);
  if (!session) {
    res.sendStatus(404);
    return;
  }
  await session.destroy();
  res.sendStatus(204);
};

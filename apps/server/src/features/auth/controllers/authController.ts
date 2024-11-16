import { RequestHandler } from "express";
import { User } from "@/features/users";
import bcrypt from "bcrypt";
import { Session } from "../models/Session";
import { authenticateSession } from "../middleware/authenticateSession";
import { addHours } from "date-fns";

export const loginWithCredentials: RequestHandler = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  const isUserAuthenticated =
    user && (await bcrypt.compare(req.body.password, user.password));

  if (!isUserAuthenticated) {
    res.status(400).send({ error: "invalid username or password" });
    return;
  }

  const newSession = await Session.create({
    userId: user.id,
    expiresAt: addHours(new Date(), 2),
  });

  res.status(201).send(newSession);
};

export const getCurrentUser: RequestHandler[] = [
  authenticateSession,
  async (req, res) => {
    res.send(req.user);
  },
];

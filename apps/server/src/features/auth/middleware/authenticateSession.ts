import { Request, RequestHandler } from "express";
import { Session } from "@/features/auth";
import { User } from "@/features/users";

const getSessionId = (req: Request) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
};

export const authenticateSession: RequestHandler = async (req, res, next) => {
  const sessionId = getSessionId(req);

  if (!sessionId) {
    res.sendStatus(401);
    return;
  }

  const session = await Session.findByPk(sessionId);

  if (!session) {
    res.sendStatus(401);
    return;
  }

  if (session.expiresAt < new Date()) {
    await session.destroy();
    res.sendStatus(401);
    return;
  }

  const user = await User.findByPk(session.userId);
  req.user = user!;

  next();
};

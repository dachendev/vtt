import { UserModel } from "@/features/users";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}

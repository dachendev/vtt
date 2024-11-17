import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

export const AuthRoutes = () => {
  const { user } = useSession();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

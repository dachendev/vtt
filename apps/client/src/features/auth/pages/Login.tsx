import { LoginForm } from "../components/LoginForm";
import { useSession } from "../contexts/SessionContext";
import { Credentials, loginWithCredentials } from "../services/authService";

export const Login = () => {
  const { setSessionId } = useSession();

  const onLogin = async (credentials: Credentials) => {
    const { id } = await loginWithCredentials(credentials);
    setSessionId(id);
  };

  return <LoginForm onLogin={onLogin} />;
};

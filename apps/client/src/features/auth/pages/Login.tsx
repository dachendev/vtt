import { Container, Typography } from "@/features/ui";
import { LoginForm } from "../components/LoginForm";
import { useSession } from "../contexts/SessionContext";
import { Credentials, loginWithCredentials } from "../services/authService";

export const Login = () => {
  const { setSessionId } = useSession();

  const onLogin = async (credentials: Credentials) => {
    const { id } = await loginWithCredentials(credentials);
    setSessionId(id);
  };

  return (
    <div style={{ paddingTop: "50px" }}>
      <Container>
        <div style={{ margin: "0 auto", maxWidth: "480px" }}>
          <Typography variant="h1" as="h1" style={{ marginBottom: "1rem" }}>
            Login
          </Typography>
          <LoginForm onLogin={onLogin} />
        </div>
      </Container>
    </div>
  );
};

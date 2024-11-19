import { Container, Typography, Card } from "@/components";
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
        <Card style={{ margin: "0 auto", maxWidth: "480px" }}>
          <Typography variant="h1" as="h1" style={{ marginBottom: "2rem" }}>
            Login
          </Typography>
          <LoginForm onLogin={onLogin} />
        </Card>
      </Container>
    </div>
  );
};

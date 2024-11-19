import { useState } from "react";
import { Credentials } from "../services/authService";
import { Input, Button, FormGroup } from "@/features/ui";

interface LoginFormProps {
  onLogin: (credentials: Credentials) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
      </FormGroup>
      <FormGroup>
        <Button variant="primary" type="submit" fullWidth>
          Login
        </Button>
      </FormGroup>
    </form>
  );
};

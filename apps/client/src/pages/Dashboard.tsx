import { LogoutButton, useSession } from "@/features/auth";
import { DiceRoller } from "@/features/dice";
import { Container } from "@/features/ui";

export const Dashboard = () => {
  const { user } = useSession();

  return (
    <div style={{ paddingTop: "50px" }}>
      <Container>
        {user && (
          <div>
            <p>Hello {user.username}</p>
            <LogoutButton />
          </div>
        )}
        <DiceRoller />
      </Container>
    </div>
  );
};

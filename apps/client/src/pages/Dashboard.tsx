import { LogoutButton, useSession } from "@/features/auth";
import { DiceRoller } from "@/features/dice";
import { Card, Container, Typography } from "@/components/ui";
import { useState } from "react";

export const Dashboard = () => {
  const { user } = useSession();
  const [rollResult, setRollResult] = useState<number>();
  const [rollValues, setRollValues] = useState<number[]>();

  const onRoll = (result: number, values: number[]) => {
    setRollResult(result);
    setRollValues(values);
  };

  return (
    <div style={{ paddingTop: "50px" }}>
      <Container>
        {user && (
          <div>
            <p>Hello {user.username}</p>
            <LogoutButton />
          </div>
        )}
        <Card style={{ marginBottom: "1rem" }}>
          <DiceRoller onRoll={onRoll} style={{ marginBottom: "1rem" }} />
          <Typography variant="body" as="p">
            Values: {rollValues?.join(", ")}
          </Typography>
          <Typography variant="body" as="p">
            Result: {rollResult}
          </Typography>
        </Card>
      </Container>
    </div>
  );
};

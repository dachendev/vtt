import { LogoutButton, useSession } from "@/features/auth";
import { DiceRoller } from "@/features/dice";
import { Container, Typography } from "@/components";
import { useState } from "react";
import { Moveable } from "@/components/ui/components/Moveable";

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
        <Moveable>
          <DiceRoller onRoll={onRoll} style={{ marginBottom: "1rem" }} />
          <Typography variant="body" as="p">
            Values: {rollValues?.join(", ")}
          </Typography>
          <Typography variant="body" as="p">
            Result: {rollResult}
          </Typography>
        </Moveable>
      </Container>
    </div>
  );
};

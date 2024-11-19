import { LogoutButton, useSession } from "@/features/auth";
import { DiceRoller } from "@/features/dice";
import { Container, Typography } from "@/components";
import { useState } from "react";
import { Draggable, Canvas } from "@/features/grid";

export const Dashboard = () => {
  const { user } = useSession();
  const [rollResult, setRollResult] = useState<number>();
  const [rollValues, setRollValues] = useState<number[]>();

  const onRoll = (result: number, values: number[]) => {
    setRollResult(result);
    setRollValues(values);
  };

  return (
    <div style={{ position: "relative" }}>
      {user && (
        <div>
          <p>Hello {user.username}</p>
          <LogoutButton />
        </div>
      )}
      <Draggable>
        <DiceRoller onRoll={onRoll} style={{ marginBottom: "1rem" }} />
        <Typography variant="body" as="p">
          Values: {rollValues?.join(", ")}
        </Typography>
        <Typography variant="body" as="p">
          Result: {rollResult}
        </Typography>
      </Draggable>
      <Canvas width="500" height="500" />
    </div>
  );
};

import { LogoutButton, useSession } from "@/features/auth";
import { DiceRoller } from "@/features/dice";

export const Dashboard = () => {
  const { user } = useSession();

  return (
    <div>
      {user && (
        <div>
          <p>Hello {user.username}</p>
          <LogoutButton />
        </div>
      )}
      <DiceRoller />
    </div>
  );
};

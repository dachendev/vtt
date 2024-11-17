import { useSession } from "../contexts/SessionContext";

export const LogoutButton = () => {
  const { clearSession } = useSession();

  return (
    <button type="button" onClick={clearSession}>
      Logout
    </button>
  );
};

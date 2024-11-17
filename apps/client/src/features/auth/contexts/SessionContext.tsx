import { createContext, useContext, useEffect, useState } from "react";
import { getSessionUser } from "../services/authService";

interface SessionContext {
  user: any;
  isLoading: boolean;
  setSessionId: (newId: string) => void;
  clearSession: () => void;
}

interface SessionProviderProps {
  children?: React.ReactNode;
}

const sessionIdKey = "sessionId";

export const SessionContext = createContext<SessionContext | null>(null);

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const storedSessionId = localStorage.getItem(sessionIdKey);
  const [sessionId, setSessionId] = useState<string | null>(storedSessionId);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSetSessionId = (newId: string) => {
    setSessionId(newId);
    localStorage.setItem(sessionIdKey, newId);
  };

  const clearSession = () => {
    setSessionId(null);
    setUser(null);
    localStorage.removeItem(sessionIdKey);
  };

  const context: SessionContext = {
    user,
    isLoading,
    setSessionId: handleSetSessionId,
    clearSession,
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getSessionUser(sessionId);
        setUser(user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchUser();
  }, [sessionId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession has to be used within SessionProvider");
  }
  return context;
};

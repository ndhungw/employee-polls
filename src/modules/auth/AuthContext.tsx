/* eslint-disable react-refresh/only-export-components */
import { sleep } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { setStoredUser } from "./AuthStore";
import { User } from "./type";

export type AuthContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      `useAuthContext must be used inside <AuthenticationContextProvider/>`,
    );
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (user: User) => {
    await sleep(500);
    await setStoredUser(user);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await sleep(1000);
    await setStoredUser(null);
    setUser(null);
  }, []);

  const value = useMemo(() => {
    return {
      user,
      setUser,
      login,
      logout,
    };
  }, [login, logout, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

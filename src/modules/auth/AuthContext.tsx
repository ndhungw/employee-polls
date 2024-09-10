/* eslint-disable react-refresh/only-export-components */
import LoadingOverlay from "@/components/LoadingOverlay";
import { sleep } from "@/lib/utils";
import { User } from "@/types/user";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { setStoredUserId } from "./AuthStore";

export type AuthContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuthContext must be used inside <AuthenticationContextProvider/>`);
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (user: User) => {
    try {
      setLoading(true);
      await sleep(500);
      await setStoredUserId(user.id);
      setUser(user);
    } catch (error) {
      console.log("login  error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await sleep(1000);
      await setStoredUserId(null);
      setUser(null);
    } catch (error) {
      console.log("logout  error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      user,
      setUser,
      login,
      logout,
      setLoading,
    };
  }, [login, logout, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {loading && <LoadingOverlay />}
    </AuthContext.Provider>
  );
};

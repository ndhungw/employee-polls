import { AuthContextValue } from "@/modules/auth/AuthContext";

export type RootRouteWithContext = {
  auth: AuthContextValue;
};

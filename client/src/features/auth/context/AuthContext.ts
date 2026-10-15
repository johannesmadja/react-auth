import { createContext, use } from "react";
import type { Credentials, User } from "../types";

export interface AuthContextValue {
  user: User | null;
  logIn: (credentials: Credentials) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
  }
  return context;
}

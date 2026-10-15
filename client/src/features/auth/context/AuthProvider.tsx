import { useState, type ReactNode } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "./AuthContext";
import { logout, signIn } from "../services/authService";
import type { Credentials, User } from "../types";

function AuthProvider({ children }: { children: ReactNode }) {
  const initialUser = useLoaderData<User | null>();
  const [user, setUser] = useState(initialUser);

  async function logIn(credentials: Credentials) {
    const user = await signIn(credentials);
    setUser(user);
  }

  async function logOut() {
    await logout(); 
    setUser(null);
  }

  return <AuthContext value={{ user, logIn, logOut }}>{children}</AuthContext>;
}

export default AuthProvider;

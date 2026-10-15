import { apiFetch } from "@/services/api";
import type { Credentials, User, UserInput } from "../types";

export async function signUp(newUser: UserInput) {
  return apiFetch<User>("/api/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
}

export async function signIn(credentials: Credentials) {
  return apiFetch<User>("/api/auth", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function logout() {
  return apiFetch<null>("/api/auth", {
    method: "DELETE",
  });
}

export async function getCurrentUser() {
  // The API answers { message: "" } (not an error) when nobody is logged in
  const data = await apiFetch<User | { message: string }>("/api/auth/current");
  return "_id" in data ? data : null;
}

import type { UserInput } from "@/features/signup/user";
import { apiFetch } from "@/services/api";

export async function createUser(newUser: UserInput) {
  return apiFetch("", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
}

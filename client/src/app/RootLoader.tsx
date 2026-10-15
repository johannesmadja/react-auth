import { getCurrentUser } from "@/features/auth/services/authService";

export async function RootLoader() {
  return getCurrentUser();
}

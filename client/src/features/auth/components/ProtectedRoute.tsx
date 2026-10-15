import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

// Usable as a wrapper (<ProtectedRoute><Page /></ProtectedRoute>)
// or as a layout route in the router (renders the child routes via <Outlet />)
function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;

import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Loading from "@/components/ui/Loading";
import { RootLoader } from "./RootLoader";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

// Lazy-load a page: the router downloads its code only when the route is visited
const lazyPage =
  (importPage: () => Promise<{ default: ComponentType }>) => async () => ({
    Component: (await importPage()).default,
  });

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: RootLoader,
    HydrateFallback: Loading,
    children: [
      {
        index: true,
        lazy: lazyPage(() => import("@/features/home/pages/HomePage")),
      },
      {
        path: "signup",
        lazy: lazyPage(() => import("@/features/auth/pages/SignUpPage")),
      },
      {
        path: "signin",
        lazy: lazyPage(() => import("@/features/auth/pages/SignInPage")),
      },
      {
        // Every child route below requires a logged-in user
        Component: ProtectedRoute,
        children: [
          {
            path: "profile",
            lazy: lazyPage(
              () => import("@/features/profile/pages/ProfilePage"),
            ),
          },
        ],
      },
    ],
  },
]);

import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Loading from "@/components/ui/Loading";

// Lazy-load a page: the router downloads its code only when the route is visited
const lazyPage =
  (importPage: () => Promise<{ default: ComponentType }>) => async () => ({
    Component: (await importPage()).default,
  });

export const ROUTER = createBrowserRouter([
    {
        path : "/", 
        Component : App, 
        HydrateFallback : Loading,
        children : [
            {
                index : true, 
                 lazy: lazyPage(() => import("@/features/home/pages/HomePage")),
            }, 
            {
                path : "signup", 
                 lazy: lazyPage(() => import("@/features/signup/pages/SignUpPage")),
            }
        ]
    }
])
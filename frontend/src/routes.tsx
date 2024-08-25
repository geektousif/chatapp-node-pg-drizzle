import { createBrowserRouter, Outlet } from "react-router-dom";

import { ProtectedRoute } from "./components/common/ProtectedRoute";
import AuthWrapper from "./components/common/AuthWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { HomePage } = await import("./pages/HomePage");
      return { Component: HomePage };
    },
  },
  {
    path: "/login",
    lazy: async () => {
      const { LoginPage } = await import("./pages/LoginPage");
      return { Component: LoginPage };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { RegisterPage } = await import("./pages/RegisterPage");
      return { Component: RegisterPage };
    },
  },
  {
    path: "/dashboard",
    element: (
      <AuthWrapper>
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </AuthWrapper>
    ),
    children: [
      {
        path: "",
        lazy: async () => {
          const { DashboardPage } = await import(
            "./pages/protected/DashboardPage"
          );
          return { Component: DashboardPage };
        },
      },
    ],
  },

  //   {
  //     path: "*",
  //     lazy: async () => {
  //       const { ErrorPage } = await import("./pages/ErrorPage");
  //       return { Component: ErrorPage };
  //     },
  //   },
]);

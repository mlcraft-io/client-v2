import React from "react";
import { createBrowserRouter } from "react-router-dom";

import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";
import SignUpPage from "@/pages/SignUp";
import Error404Page from "@/pages/Error404";
import Error500Page from "@/pages/Error500";
import BasicLayout from "@/layouts/BasicLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error500Page />,
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },
]);

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource-variable/manrope";

import RootLayout from "@/layouts/RootLayout";

import { router } from "./router";
import "./i18n";

import "./global.less";

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </React.StrictMode>
);

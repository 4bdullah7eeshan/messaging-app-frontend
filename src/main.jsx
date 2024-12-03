import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./context/SocketContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);

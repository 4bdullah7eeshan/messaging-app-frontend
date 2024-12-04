import App from "./App";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { element } from "prop-types";

const routes = [
  {
    path: "/", // This will match the root path
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ), // Render App here if needed
  },
  {
    path: "/",
    element: <Layout />, // Use the layout here
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sign_up",
        element: <SignUp />,
      },
      {
        path: "sign_in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;

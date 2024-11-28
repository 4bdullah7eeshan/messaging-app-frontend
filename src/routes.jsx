import App from "./App";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";

import { element } from "prop-types";

const routes = [
  {
    path: "/",
    element: <Layout />, // Use the layout here
    errorElement: <ErrorPage />,
    children: [
      {
        path: "", // This will match the root path
        element: <App />, // Render App here if needed
      },
      {
        path: "sign_up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
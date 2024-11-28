import App from "./App";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import Product from "./pages/Product";
import About from "./pages/About";
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
        path: "products",
        element: <Products />, // Render Products page here
      },
      {
        path: "products/:productId",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />, // Render Cart page here
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

export default routes;
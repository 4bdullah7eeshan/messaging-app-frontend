import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode";



const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <ColorModeProvider>
        <RouterProvider router={router} />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)

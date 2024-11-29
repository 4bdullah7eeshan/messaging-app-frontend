import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;

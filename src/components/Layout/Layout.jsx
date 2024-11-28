import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <Flex 
      direction="column" 
      minH="100vh"
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default Layout;
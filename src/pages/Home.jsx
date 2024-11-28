import { Flex } from "@chakra-ui/react";
import NavBar from "../components/Navbar/Navbar"; // Assuming NavBar exists
import Footer from "../components/Footer/Footer"; // Footer from the earlier implementation
import HomeMain from "../components/HomeMain/HomeMain";

function Home() {
  return (
    <Flex 
      direction="column" 
      minH="100vh"
    >
      <NavBar />
      <HomeMain />
      <Footer />
    </Flex>
  );
}

export default Home;

import { Flex } from "@chakra-ui/react";
import NavBar from "../components/Navbar/Navbar"; // Assuming NavBar exists
import Footer from "../components/Footer/Footer"; // Footer from the earlier implementation
import SignUp from "../components/SignUp/SignUp";

function SignUpPage() {
  return (
    <Flex 
      direction="column" 
      minH="100vh"
    >
      <NavBar />
      <SignUp />
      <Footer />
    </Flex>
  );
}

export default SignUpPage;

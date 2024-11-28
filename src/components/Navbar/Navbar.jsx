import { Box, Flex, Spacer, Button, useBreakpointValue } from "@chakra-ui/react";

function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex p={4} bg="blue.500" color="white" align="center">
      <Box fontSize="lg" fontWeight="bold">Messaging App</Box>
      <Spacer />
      {isMobile ? (
        <Button variant="outline" colorScheme="whiteAlpha">Menu</Button>
      ) : (
        <>
          <Button variant="outline" mr={2} colorScheme="whiteAlpha">Login</Button>
          <Button colorScheme="whiteAlpha">Sign Up</Button>
        </>
      )}
    </Flex>
  );
}

export default Navbar;

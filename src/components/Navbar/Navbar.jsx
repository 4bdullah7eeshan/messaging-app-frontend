import { Box, Flex, Spacer, Button, useBreakpointValue } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";

function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex p={4} align="center" borderBottom="1px solid" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
      <Box fontSize="lg" fontWeight="bold">
        Messaging App
      </Box>
      <Spacer />
      {isMobile ? (
        <Button variant="outline">Menu</Button>
      ) : (
        <>
          <Button variant="ghost" mr={2}>
            Login
          </Button>
          <Button variant="solid" mr={4}>
            Sign Up
          </Button>
          <ColorModeButton />
        </>
      )}
    </Flex>
  );
}

export default Navbar;

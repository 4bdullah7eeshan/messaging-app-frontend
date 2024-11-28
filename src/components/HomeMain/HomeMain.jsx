import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";

function HomeMain() {
  return (
    <Box 
      as="main" 
      flex="1" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      px={4} 
      py={{ base: 6, md: 12 }}
      bg="gray.50"
    >
      <Stack 
        spacing={6} 
        textAlign="center" 
        maxW="600px" 
        mx="auto"
      >
        <Heading size="2xl" fontWeight="bold" color="gray.800">
          Welcome to Messaging App
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Stay connected with friends and groups. Chat seamlessly and experience real-time messaging built for everyone.
        </Text>
        <Button 
          colorScheme="blue" 
          size="lg" 
          as="a" 
          href="/sign-up" 
          _hover={{ bg: "blue.600" }}
        >
          Get Started
        </Button>
      </Stack>
    </Box>
  );
}

export default HomeMain;

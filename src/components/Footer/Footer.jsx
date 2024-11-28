import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import { Github } from "lucide-react";

function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white" py={6} mt="auto">
      <Flex 
        direction={{ base: "column", md: "row" }} 
        align="center" 
        justify="space-between" 
        maxW="1200px" 
        mx="auto"
      >
        <Text mb={{ base: 4, md: 0 }} fontSize="sm" textAlign="center">
          Copyright &copy; Abdullah Zeeshan {new Date().getFullYear()}
        </Text>
        <Link 
          href="https://github.com/4bdullah7eeshan" 
          isExternal 
          aria-label="GitHub profile"
          display="flex" 
          alignItems="center" 
          gap={2} 
          _hover={{ color: "blue.400" }}
        >
          <Icon as={Github} w={5} h={5} />
          <Text>GitHub</Text>
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;

import { Flex, Box, Link, Text } from "@chakra-ui/react";
import { Github } from "lucide-react";

function Footer() {
  return (
    <Flex
      as="footer"
      bg="gray.800"
      color="white"
      py={4}
      px={8}
      justify="space-between"
      align="center"
      mt="auto"
    >
      <Text>Copyright &copy; Abdullah Zeeshan 2024</Text>
      <Box>
        <Link
          href="https://github.com/4bdullah7eeshan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <Github />
        </Link>
      </Box>
    </Flex>
  );
}

export default Footer;

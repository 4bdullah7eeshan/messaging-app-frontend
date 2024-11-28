import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    Alert,
    AlertIcon,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  function Signup() {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(false);
  
      // Simple client-side validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to sign up");
        }
  
        setSuccess(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Sign Up
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Successfully signed up! You can now log in.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    );
  }
  
  export default Signup;
  
import { useState } from "react";
import { MdError, MdCheckCircle } from "react-icons/md";
import {
    Heading,
    Input,
    Button,
    Stack,
    Alert,
    Fieldset,
    Box,
} from "@chakra-ui/react";
import { Field } from "../ui/field";



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
    <Box maxW="400px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      <Heading>Sign Up</Heading>
      {error && (
        <Alert status="error" mb="4" borderRadius="md">
            <Box as={MdError} color="red.500" boxSize="5" mr="2" />
            {error}
        </Alert>
        )}
        {success && (
        <Alert status="success" mb="4" borderRadius="md">
            <Box as={MdCheckCircle} color="green.500" boxSize="5" mr="2" />
            Successfully signed up! You can now log in.
        </Alert>
        )}


      <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
            <Fieldset.Legend>
                Your details
            </Fieldset.Legend>
            <Fieldset.HelperText>
                Please provide your details below.
            </Fieldset.HelperText>
        </Stack>
      <Fieldset.Content>

        <Field label="Username">
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </Field>

        <Field label="Email">
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          
        </Field>

        <Field label="Password">
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Field>

        <Field label="Confirm Password">
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </Field>

      </Fieldset.Content>
      <Fieldset.ErrorText>
        Some fields are invalid. Please check them.
      </Fieldset.ErrorText>
      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
      </form>
    </Box>
  );
}

export default Signup;

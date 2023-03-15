import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UnlockIcon } from "@chakra-ui/icons";
import axios from "axios";
import { registerRoute } from "../../Utils/ApiRoutes/APIRoutes";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState({
    username: ``,
    email: ``,
    password: ``,
    confirmPassword: ``,
  });

  useEffect(() => {
    if (localStorage.getItem(`devNest-user`)) {
      navigate(`/`);
    }
  }, [navigate]);

  const showToast = () => {
    toast({
      title: `Logged In`,
      description: `Successfully Logged Out`,
      duration: 5000,
      isClosable: true,
      status: `success`,
      position: `top`,
      icon: <UnlockIcon />,
    });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      showToast();
      return false;
    } else if (username.length < 3) {
      showToast();
      return false;
    } else if (password.length <= 8) {
      showToast();
      return false;
    } else if (email === ``) {
      showToast();
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(values);
    event.preventDefault();
    const { password, username, email } = values;
    if (handleValidation()) {
      // console.log(`in validation : ${registerRoute}`)
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        showToast();
      }
      if (data.status === true) {
        localStorage.setItem(`devNest-user`, JSON.stringify(data.user));
        navigate(`/`);
      }
    }
  };

  return (
    <Container>
      <Box p={6} maxWidth="sm" mx="auto" bg={`gray.300`} borderRadius="2xl">
        <Box textAlign="center">
          <Heading>Create an account</Heading>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={4} mt={8}>
            <FormControl isRequired>
              <Input
                focusBorderColor="pink.400"
                type="text"
                placeholder="username"
                onChange={(e) => handleChange(e)}
                name="username"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                focusBorderColor="pink.400"
                placeholder="email"
                type="email"
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                focusBorderColor="pink.400"
                placeholder="password"
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                focusBorderColor="pink.400"
                type="password"
                placeholder="retype password"
                onChange={(e) => handleChange(e)}
                name="confirmPassword"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={8}>
              Sign up
            </Button>
            <Text mt={4}>
              already have an account? please <Link to={`/login`}>Login</Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #f1f1f1;
`;

export default Register;

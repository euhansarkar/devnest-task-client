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
import { Link } from "react-router-dom";
import { loginRoute } from "../../Utils/ApiRoutes/APIRoutes";

function LogIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: ``,
    password: ``,
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
    const { password, username } = values;
    if (username.length === ``) {
      showToast();
      return false;
    } else if (password.length <= 8) {
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
    console.log(values)
    event.preventDefault();
    const { password, username } = values;
    if (handleValidation()) {
      // console.log(`in validation : ${loginRoute}`)
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data);
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
                placeholder="password"
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
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

export default LogIn;

import React from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Spacer,
  Button,
  HStack,
  useToast,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/AuthProvider/AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const currentUser = useUser();

  const showToast = () => {
    toast({
      title: `Logged In`,
      description: `Successfully Logged Out`,
      duration: 5000,
      isClosable: true,
      status: `success`,
      position: `top`,
      icon: <UnlockIcon/>
    });
  };

  const handleLogOut = async () => {
    localStorage.clear();
    showToast();
    navigate(`/login`);
  };

  return (
    <Flex as={`nav`} p="10px" alignItems="center" mb="40px">
      <Heading as={`h1`}>DevNest</Heading>
      <Spacer />
      <HStack spacing={20}>
        <Avatar src="/img/mario.png">
          <AvatarBadge width={`1.3em`} bg="teal.500">
          <Text fontSize={`xs`} color="white">3</Text>
          </AvatarBadge>
        </Avatar>
        <Text>{currentUser?.email}</Text>
        <Button onClick={handleLogOut} colorScheme={`purple`}>logout</Button>
      </HStack>
    </Flex>
  );
};

export default Header;

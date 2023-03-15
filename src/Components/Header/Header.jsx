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

const Header = () => {
  const toast = useToast();

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
        <Text>euhansarkar@gmail.com</Text>
        <Button onClick={showToast} colorScheme={`purple`}>logout</Button>
      </HStack>
    </Flex>
  );
};

export default Header;

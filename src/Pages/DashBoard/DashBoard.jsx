import React from "react";
import {
  SimpleGrid,
  Box,
  Card,
  CardHeader,
  Text,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Button, Divider, Avatar
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { ViewIcon, EditIcon } from "@chakra-ui/icons";

const DashBoard = () => {
  const tasks = useLoaderData();
  console.log(tasks);

  return (
    <SimpleGrid columns={4} spacing={10} minChildWidth={250}>
      {tasks.tasks.map((task) => (
        <Card gap={5} borderTop="8px" borderColor="purple.400" bg={`white`}>
          <CardHeader>
            <Flex>
              <Avatar src={task.img} />
              <Box>
                <Heading as={`h3`} size={`sm`}>
                  {task.title}
                </Heading>
                <Text>by {task.author}</Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>{task.description}</CardBody>
          <Divider borderColor={`gray.200`}/>
          <CardFooter>
            <HStack>
              <Button variant={`ghost`} leftIcon={<ViewIcon />}>watch</Button>
              <Button variant={`ghost`} leftIcon={<EditIcon />}>comment</Button>
            </HStack>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default DashBoard;

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
  Button,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useUser } from "../../Contexts/AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { deleteSelectedTask, findAllTaskRoute } from "../../Utils/ApiRoutes/APIRoutes";
import { useState } from "react";
import { useEffect } from "react";

const DashBoard = () => {
  const currentUser = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${findAllTaskRoute}/${
          JSON.parse(localStorage.getItem(`devNest-user`))?.email
        }`
      )
      .then((res) => setTasks(res.data.tasks));
  }, []);


  const deleteTask = (task) => {
    const link = `${deleteSelectedTask}/${task?._id}`
    axios.delete(link)
    .then(res => {
      console.log(res)
    })
  }


  return (
    <>
      {!currentUser ? (
        <Navigate to={`/login`} />
      ) : (
        <SimpleGrid columns={4} spacing={10} minChildWidth={250}>
          {tasks.map((task, index) => (
            <Card
              key={index}
              gap={5}
              borderTop="8px"
              borderColor="purple.400"
              bg={`white`}
            >
              <CardHeader>
                <Flex>
                  <Avatar src="" />
                  <Box ml={3}>
                    <Heading as={`h3`} size={`sm`}>
                      {task?.taskname}
                    </Heading>
                    <Text>
                      by{" "}
                      {JSON.parse(localStorage.getItem(`devNest-user`))?.username}
                    </Text>
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>{task.description}</CardBody>
              <Divider borderColor={`gray.200`} />
              <CardFooter>
                <HStack>
                  <Button variant={`ghost`} leftIcon={<EditIcon />}>
                    edit
                  </Button>
                  <Button onClick={() => deleteTask(task)} variant={`ghost`} leftIcon={<DeleteIcon />}>
                    remove
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default DashBoard;

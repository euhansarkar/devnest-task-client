import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SimpleGrid, Button, Card, useToast, Heading, Box, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../Contexts/AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  deleteSelectedTask,
  findAllTaskRoute,
  modifySelectedTask,
} from "../../Utils/ApiRoutes/APIRoutes";
import { useState } from "react";
import { useEffect } from "react";
import Task from "./Task/Task";
import { CalendarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const currentUser = useUser();
  const toast = useToast();

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `tasks`,
      JSON.parse(localStorage.getItem(`devNest-user`))?.email,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${findAllTaskRoute}/${
          JSON.parse(localStorage.getItem(`devNest-user`))?.email
        }`
      );
      const data = await res.json();
      return data.tasks;
    },
  });

  if (isLoading) {
    return `...........loading`;
  }

  const showToast = (title, description, status) => {
    return toast({
      title,
      description,
      duration: 2000,
      isClosable: true,
      status,
      position: `top`,
      icon: <CalendarIcon />,
    });
  };

  const handleDeleteTask = (task) => {
    const link = `${deleteSelectedTask}/${task?._id}`;
    axios.delete(link).then((res) => {
      console.log(res);
      if (res.data.status === true) {
        refetch();
        showToast(
          `data deleted successfully`,
          `successfully deleted a task from your tasklist`,
          `success`
        );
      }
    });
  };

  const handleEditTask = (task) => {
    axios
      .patch(`${modifySelectedTask}/${task._id}`, { ...task })
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          showToast(
            `data editing successfully`,
            `successfully edited a task in your tasklist`,
            `success`
          );
          refetch();
        }
      });
  };

  return (
    <>
      {!JSON.parse(localStorage.getItem(`devNest-user`)) ? (
        <Navigate to={`/login`} />
      ) : (
        <>
          {tasks?.length > 0 ? (
            <SimpleGrid columns={4} spacing={10} minChildWidth={250}>
              {tasks?.map((task, index) => (
                <Task
                  task={task}
                  key={index}
                  handleDeleteTask={handleDeleteTask}
                  handleEditTask={handleEditTask}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box display={"flex"} h="80" w="full" alignItems="center" justifyContent="center">
            <Heading as={`h2`} textAlign="center">
              {" "}
              you did't added any task yet.{" "}
              <Text color="blue.400"><Link to={`/create`}>add a task</Link></Text>
            </Heading>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default DashBoard;

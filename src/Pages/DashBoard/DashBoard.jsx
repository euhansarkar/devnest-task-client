import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SimpleGrid, Button, Card } from "@chakra-ui/react";
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

const DashBoard = () => {
  const currentUser = useUser();

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


  const handleDeleteTask = (task) => {
    const link = `${deleteSelectedTask}/${task?._id}`;
    axios.delete(link).then((res) => {
      if(res.status){
        refetch();
      }
    });
  };

  const handleEditTask = (task) => {
    axios
      .patch(`${modifySelectedTask}/${task._id}`, { ...task })
      .then((res) => {
        if(res.status){
          refetch();
        }
      });
  };

  return (
    <>
      {!currentUser ? (
        <Navigate to={`/login`} />
      ) : (
        <SimpleGrid columns={4} spacing={10} minChildWidth={250}>
          {tasks?.map((task, index) => (
            <Task
              task={task}
              index={index}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default DashBoard;

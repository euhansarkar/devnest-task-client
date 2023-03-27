import { CalendarIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Flex,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useUser } from "../../Contexts/AuthProvider/AuthProvider";
import { addTaskRoute } from "../../Utils/ApiRoutes/APIRoutes";

const Create = () => {
  const toast = useToast();
  const currentUser = useUser();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    taskname: ``,
    taskcategory: ``,
    description: ``,
    starttime: ``,
    endtime: ``,
  });

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

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { taskname, taskcategory, description, starttime, endtime } = values;
    if (values) {
      // console.log(`in validation : ${registerRoute}`)
      const { data } = await axios.post(addTaskRoute, {
        taskname,
        taskcategory,
        description,
        starttime,
        endtime,
        email: JSON.parse(localStorage.getItem(`devNest-user`))?.email,
      });
      console.log(data);
      if (data.status === false) {
        showToast(
          `data adding failed`,
          `your expected data not added to your tasklist`,
          `error`
        );
      } else {
        showToast(
          `data added successfully`,
          `successfully added a task on your tasklist`,
          `success`
        );
        navigate(`/`);
      }
    }
  };

  return (
    <>
      {!JSON.parse(localStorage.getItem(`devNest-user`)) ? (
        <Navigate to={`/login`} />
      ) : (
        <Form onSubmit={(e) => handleSubmit(e)} method="post" action="/create">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <FormControl isRequired mb="5px">
                <FormLabel>Task Name:</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="taskname"
                />
                <FormHelperText>enter a descriptive task name</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired mb="5px">
                <FormLabel>Task Category:</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="taskcategory"
                />
                <FormHelperText>enter a task category</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired mb="5px">
                <FormLabel>Start Date:</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="date"
                  name="starttime"
                />
                <FormHelperText>task start date</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired mb="5px">
                <FormLabel>End Date</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="date"
                  name="endtime"
                />
                <FormHelperText>Task End date</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl isRequired mb={"5px"} gridAutoFlow>
                <FormLabel>Task Description:</FormLabel>
                <Textarea
                  onChange={(e) => handleChange(e)}
                  name="description"
                  placeholder="enter a detailed description for your task"
                ></Textarea>
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl display={`flex`} mt={5} alignItems={"center"} mb="5px">
            <Checkbox
              colorScheme={"purple"}
              name="isPriority"
              size={`lg`}
            ></Checkbox>
            <FormLabel mb={"0"} ml="10px">
              make this a priority task
            </FormLabel>
          </FormControl>

          <Button mt={5} type="submit">
            submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default Create;

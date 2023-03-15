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
} from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useUser } from "../../Contexts/AuthProvider/AuthProvider";

const Create = () => {
  const currentUser = useUser();
  return (
    <>
      {!currentUser ? (
        <Navigate to={`/login`} />
      ) : (
        <Box maxWidth={"400px"}>
          <Form method="post" action="/create">
            <FormControl isRequired mb="40px">
              <FormLabel>Task Name:</FormLabel>
              <Input type="text" name="title" />
              <FormHelperText>enter a descriptive task name</FormHelperText>
            </FormControl>

            <FormControl isRequired mb={"40px"}>
              <FormLabel>Task Description:</FormLabel>
              <Textarea placeholder="enter a detailed description for your task"></Textarea>
            </FormControl>

            <FormControl display={`flex`} alignItems={"center"} mb="40px">
              <Checkbox
                colorScheme={"purple"}
                name="isPriority"
                size={`lg`}
              ></Checkbox>
              <FormLabel mb={"0"} ml="10px">
                make this a priority task
              </FormLabel>
            </FormControl>

            <Button type="submit">submit</Button>
          </Form>
        </Box>
      )}
    </>
  );
};

export default Create;

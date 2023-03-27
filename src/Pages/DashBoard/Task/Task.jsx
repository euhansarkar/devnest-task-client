import React from "react";
import {
  Box,
  Card,
  CardHeader,
  Text,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Divider,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalContainer from "../../../Components/ModalContainer/ModalContainer";
import { useState } from "react";
import axios from "axios";
import { modifySelectedTask } from "../../../Utils/ApiRoutes/APIRoutes";

const Task = ({ task, handleDeleteTask, handleEditTask }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [values, setValues] = useState({
    taskname: task?.taskname,
    taskcategory: task?.taskcategory,
    description: task?.description,
    starttime: task?.starttime,
    endtime: task?.endtime,
    _id: task?._id,
  });


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditTask(values);
  };

  return (
    <>
      <Card gap={5} borderTop="8px" borderColor="purple.400" bg={`white`}>
        <CardHeader>
          <Flex>
            <Avatar src="" />
            <Box ml={3}>
              <Heading as={`h3`} size={`sm`}>
                {task?.taskname}
              </Heading>
              <Text>
                by {JSON.parse(localStorage.getItem(`devNest-user`))?.username}
              </Text>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>{task.description}</CardBody>
        <Divider borderColor={`gray.200`} />
        <CardFooter>
          <HStack>
            <Button onClick={onOpen} variant={`ghost`} leftIcon={<EditIcon />}>
              edit
            </Button>
            <Button
              onClick={() => handleDeleteTask(task)}
              variant={`ghost`}
              leftIcon={<DeleteIcon />}
            >
              remove
            </Button>
          </HStack>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Text>Update Your Task</Text>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <form id="new-note" onSubmit={handleSubmit}>
              <FormControl mb={2}>
               <FormLabel>task title</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="taskname"
                  defaultValue={values.taskname}
                />
              </FormControl>

              <FormControl mb={2}>
               <FormLabel>task category</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="taskcategory"
                  defaultValue={task.taskcategory}
                />
              </FormControl>

              <FormControl mb={2}>
               <FormLabel>task description</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="description"
                  defaultValue={task.description}
                />
              </FormControl>

              <FormControl mb={2}>
               <FormLabel>task start date</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="date"
                  name="starttime"
                  defaultValue={task.starttime}
                />
              </FormControl>

              <FormControl mb={2}>
               <FormLabel>task end date</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="date"
                  name="endtime"
                  defaultValue={task.endtime}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" onClick={onClose} form="new-note">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Task;

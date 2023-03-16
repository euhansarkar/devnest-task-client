import React from "react";
import {
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

const ModalContainer = (
  {
    handleModalClose,
    isModalOpen,
    inputValue,
    handleSubmit,
    setInputValue
  }
) => {
  // const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hello World</ModalHeader>
          <ModalBody>
            <form
              id="new-note"
              onSubmit={(event) => {
                event.preventDefault();
                alert("Submitted");
              }}
            >
              <FormControl>
                <FormLabel>Create Account</FormLabel>
                <Input type="email" />
                <FormHelperText>
                  We keep your account data secure
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" form="new-note">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Button onClick={onOpen}>click</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <form
              id="new-note"
              onSubmit={(event) => {
                event.preventDefault();
                alert("Submitted");
              }}
            >
              <FormControl>
                <FormLabel>Create Account</FormLabel>
                <Input type="email" />
                <FormHelperText>
                  We keep your account data secure
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" form="new-note">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default ModalContainer;

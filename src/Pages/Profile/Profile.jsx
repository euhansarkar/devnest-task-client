import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  ChatIcon,
  CheckIcon,
  EmailIcon,
  StarIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { useUser } from "../../Contexts/AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const currentUser = useUser();

  return (
    <>
      {!JSON.parse(localStorage.getItem(`devNest-user`)) ? (
        <Navigate to={`/login`} />
      ) : (
        <Tabs>
          <TabList>
            <Tab _selected={{ color: `white`, bg: `purple.400` }}>acc info</Tab>
            <Tab _selected={{ color: `white`, bg: `purple.400` }}>
              acc history
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <List spacing={4}>
                <ListItem>
                  <ListIcon as={EmailIcon} />
                  Email: euhansarkar@gmail.com
                </ListItem>
                <ListItem>
                  <ListIcon as={ChatIcon} />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus illum modi explicabo magnam magni delectus voluptas
                  earum aut nobis corporis necessitatibus ipsum deserunt,
                  officia aliquam saepe, dolor eaque unde error?
                </ListItem>
                <ListItem>
                  <ListIcon as={StarIcon} />
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda, perferendis!
                </ListItem>
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={4}>
                <ListItem>
                  <ListIcon color="teal.400" as={CheckIcon} />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </ListItem>
                <ListItem>
                  <ListIcon color="teal.400" as={CheckIcon} />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus illum modi explicabo magnam.
                </ListItem>
                <ListItem>
                  <ListIcon color="red.400" as={WarningIcon} />
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda, perferendis!
                </ListItem>
                <ListItem>
                  <ListIcon color="red.400" as={WarningIcon} />
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda, perferendis!
                </ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};

export default Profile;

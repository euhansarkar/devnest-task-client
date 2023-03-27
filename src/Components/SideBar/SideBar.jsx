import React from "react";
import { CalendarIcon, EditIcon, AtSignIcon } from "@chakra-ui/icons";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <List
      color={`white`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={{ base: "row", lg: "column" }}
      fontSize={`1.2em`}
      gap="6"
    >
      <ListItem>
        <NavLink to={`/`}>
          <ListIcon as={CalendarIcon} color="white" />
          DashBoard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={`/create`}>
          <ListIcon as={EditIcon} color="white" />
          create
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={`/profile`}>
          <ListIcon as={AtSignIcon} color="white" />
          profile
        </NavLink>
      </ListItem>
    </List>
  );
};

export default SideBar;

import React from "react";
import {
  Flex,
  Box,
  Heading,
  Link,
  Image,
  Text,
  IconButton
} from "@chakra-ui/core";
import NextLink from "next/link";
import UserProfileSong from "./UserProfileSong";
import SupplementStackSidebar from "./SupplementStackSidebar";

const UserProfileSidebar = ({ user }) => {
  return (
    <>
      <UserProfileSong user={user} />

      <Box mb={2}>
        <Heading as="h2" size="xs">
          TRAINS AT
        </Heading>
        <Text>Bangor Brewer Athletic Club</Text>
      </Box>

      <SupplementStackSidebar />
    </>
  );
};

export default UserProfileSidebar;

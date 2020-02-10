import React from "react";
import { Flex, Box, Image, Text, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import UserProfileSidebar from "./UserProfileSidebar";

const UserProfile = ({ user }) => {
  return (
    <Box p={6}>
      <Box>
        <Box mb={6}>
          <Flex align="center" mb={4}>
            <NextLink href="/[username]" as={`/${user.username}`}>
              <Link>
                <Image
                  src={user.picture}
                  alt={user.name}
                  height="100px"
                  borderRadius="50%"
                  mr={6}
                  ignoreFallback
                />
              </Link>
            </NextLink>

            <Box>
              <Box>
                <NextLink href="/[username]" as={`/${user.username}`}>
                  <Link _hover={{ textDecoration: "none" }}>
                    <Box>
                      <Text fontWeight="bold" fontSize="4xl">
                        {user.name}
                      </Text>
                      <Text fontSize="lg" color="#666">
                        @{user.username}
                      </Text>
                    </Box>
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Flex>

          <Text>{user.bio}</Text>
        </Box>
      </Box>

      <Box display={{ md: "flex" }}>
        <Box width={["100%", "100%", "375px"]} flexShrink={0}>
          <UserProfileSidebar user={user} />
        </Box>

        <Box
          width={["100%", "100%"]}
          px={6}
          ml={{ md: 6 }}
          display={{ md: "flex" }}
        >
          No workout data.
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;

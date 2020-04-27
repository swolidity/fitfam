import React from "react";
import { Flex, Box, Stack, Image, Text, Link, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import UserProfileSidebar from "./UserProfileSidebar";
import UserProfileTabs from "./UserProfileTabs";

const UserProfile = ({ user }) => {
  return (
    <Box margin="0 auto" maxWidth="600px" p={6}>
      <Box width={["100%", "100%", "375px"]} flexShrink={0}>
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

      <Heading size="md" mb={2}>
        {user.workouts.length} workout{user.workouts.length !== 1 ? "s" : ""}
      </Heading>

      <Stack spacing={2}>
        {user.workouts.map(workout => {
          return (
            <Box key={workout.id} p={2} backgroundColor="#fafafa">
              <NextLink href="/w/[workout_id]" as={`/w/${workout.id}`}>
                <Link>{workout.title}</Link>
              </NextLink>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default UserProfile;

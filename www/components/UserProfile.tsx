import React from "react";
import { Flex, Box, Image, Text, Link, Heading, Badge } from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";
import UserProfileTabs from "./UserProfileTabs";

const UserProfileSidebar = ({ user }) => {
  return (
    <Box display={{ md: "flex" }}>
      <Box width={["100%", "100%", "30%"]}>
        <Flex align="center" mb={3}>
          <NextLink href="/[username]" as={`/${user.username}`}>
            <Link>
              <Image
                src={user.picture}
                alt={user.name}
                height="80px"
                rounded="full"
                mr={4}
                ignoreFallback
              />
            </Link>
          </NextLink>

          <NextLink href="/[username]" as={`/${user.username}`}>
            <Link>
              <Box>
                <Text fontWeight="bold" fontSize="2xl">
                  {user.name} <Badge as="span">#1</Badge>
                </Text>
                <Text fontSize="lg" color="#666">
                  @{user.username}
                </Text>
              </Box>
            </Link>
          </NextLink>
        </Flex>

        <Text mb={5}>{user.bio}</Text>

        {user.profile_songs[0] ? (
          <>
            <Link href={user.profile_songs[0].url} isExternal>
              <Flex
                align="center"
                shadow="sm"
                borderRadius="5px"
                p={2}
                mb={5}
                backgroundColor="white"
              >
                <Image
                  src={user.profile_songs[0].thumbnail}
                  alt={user.profile_songs[0].title}
                  width="45px"
                  mr={3}
                />

                <Box>
                  <Text fontWeight="semibold">
                    {user.profile_songs[0].title}
                  </Text>
                  <Text color="#8998b1">{user.profile_songs[0].artist}</Text>
                </Box>
              </Flex>
            </Link>
          </>
        ) : null}

        <Heading fontSize="md" fontWeight="semibold" mb={2}>
          Instagram
        </Heading>

        <Text mb={5}>
          <Link
            href={`https://instagram.com/${user.instagram}`}
            color="#096cff"
          >
            {user.instagram}
          </Link>
        </Text>
      </Box>

      <Box
        width={["100%", "100%", "70%"]}
        backgroundColor="white"
        p={6}
        ml={{ md: 6 }}
        display={{ md: "flex" }}
      >
        <UserProfileTabs />
      </Box>
    </Box>
  );
};

export default UserProfileSidebar;

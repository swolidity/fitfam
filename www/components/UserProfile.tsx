import React from "react";
import { Flex, Box, Image, Text, Link, Heading, Badge } from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

const UserProfileSidebar = ({ user }) => {
  return (
    <>
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
                {user.name} <Badge>#1</Badge>
              </Text>
              <Text fontSize="lg" color="#666">
                @{user.username}
              </Text>
            </Box>
          </Link>
        </NextLink>
      </Flex>

      <Heading fontSize="md" fontWeight="semibold" mb={2}>
        Bio
      </Heading>

      <Text mb={5}>{user.bio}</Text>

      {user.profile_songs[0] ? (
        <>
          <Flex justify="space-between" mb={1}>
            <Heading fontSize="md" fontWeight="semibold" mb={2}>
              Pump Up Song
            </Heading>
          </Flex>

          <Link href={user.profile_songs[0].url} isExternal>
            <Flex align="center" shadow="sm" borderRadius="5px" p={2} mb={3}>
              <Image
                src={user.profile_songs[0].thumbnail}
                alt={user.profile_songs[0].title}
                width="45px"
                mr={3}
              />

              <Box>
                <Text fontWeight="semibold">{user.profile_songs[0].title}</Text>
                <Text color="#8998b1">{user.profile_songs[0].artist}</Text>
              </Box>
            </Flex>
          </Link>
        </>
      ) : null}

      <Heading fontSize="md" fontWeight="semibold" mb={2}>
        Bodyweight
      </Heading>

      <Text mb={5}>{user.bodyweights[0].weight} lbs</Text>
    </>
  );
};

export default UserProfileSidebar;

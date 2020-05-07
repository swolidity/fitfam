import React from "react";
import { Flex, Box, Image, Text, Link, IconButton } from "@chakra-ui/core";
import NextLink from "next/link";
import { FaEllipsisV } from "react-icons/fa";

const UserProfileSong = ({ user }) => {
  return (
    <Box>
      {user.profile_songs[0] ? (
        <Link
          href={user.profile_songs[0].url}
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <Flex
            align="center"
            shadow="sm"
            borderRadius="5px"
            mb={5}
            backgroundColor="white"
            justifyContent="space-between"
          >
            <Box>
              <Flex align="center">
                <Image
                  src={user.profile_songs[0].thumbnail}
                  alt={user.profile_songs[0].title}
                  mr={3}
                  maxWidth="70px"
                  borderRadius="5px 0 0 5px"
                  ignoreFallback
                />

                <Box p={2}>
                  <Text fontWeight="semibold">
                    {user.profile_songs[0].title}
                  </Text>
                  <Text color="#8998b1">{user.profile_songs[0].artist}</Text>
                </Box>
              </Flex>
            </Box>

            <Box>
              <NextLink
                href="/[username]/profile_song"
                as={`/${user.username}/profile_song`}
              >
                <Link
                  _hover={{
                    textDecoration: "none",
                    backgroundAttachment: "none",
                  }}
                >
                  <IconButton
                    icon={FaEllipsisV}
                    fontSize="18px"
                    color="#8998b1"
                    aria-label="more"
                    variant="ghost"
                  />
                </Link>
              </NextLink>
            </Box>
          </Flex>
        </Link>
      ) : null}
    </Box>
  );
};

export default UserProfileSong;

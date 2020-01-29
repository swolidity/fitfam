import React from "react";
import {
  Flex,
  Box,
  Image,
  Text,
  Link,
  Heading,
  Badge,
  IconButton
} from "@chakra-ui/core";
import NextLink from "next/link";
import Track from "./Track";
import { FaInstagram, FaEllipsisV } from "react-icons/fa";

const UserProfileSidebar = ({ user }) => {
  return (
    <Box display={{ md: "flex" }}>
      <Box width={["100%", "100%", "375px"]} flexShrink={0}>
        <NextLink href="/[username]" as={`/${user.username}`}>
          <Link>
            <Image
              src={user.picture}
              alt={user.name}
              height="200px"
              borderRadius="12px"
              mb={4}
              ignoreFallback
            />
          </Link>
        </NextLink>

        <Box mb={4}>
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
        </Box>

        <Text mb={5} color="rgba(0,0,0,.66)" fontSize="18px">
          {user.bio}
        </Text>

        {user.profile_songs[0] ? (
          <>
            <Link href={user.profile_songs[0].url} isExternal as="div">
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
                    />

                    <Box p={2}>
                      <Text fontWeight="semibold">
                        {user.profile_songs[0].title}
                      </Text>
                      <Text color="#8998b1">
                        {user.profile_songs[0].artist}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <NextLink
                    href="/[username]/profile_song"
                    as={`/${user.username}/profile_song`}
                  >
                    <Link>
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
          </>
        ) : null}

        <Text mb={5}>
          <Link
            href={`https://instagram.com/${user.instagram}`}
            color="#096cff"
          >
            <FaInstagram size="32px" />
          </Link>
        </Text>
      </Box>

      <Box
        width={["100%", "100%"]}
        p={6}
        ml={{ md: 6 }}
        display={{ md: "flex" }}
      >
        <Track />
      </Box>
    </Box>
  );
};

export default UserProfileSidebar;

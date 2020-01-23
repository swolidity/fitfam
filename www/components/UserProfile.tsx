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
import UserProfileTabs from "./UserProfileTabs";
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
            <Link href={user.profile_songs[0].url} isExternal>
              <Flex
                align="center"
                shadow="sm"
                borderRadius="5px"
                p={2}
                mb={5}
                backgroundColor="white"
                justifyContent="space-between"
              >
                <Box>
                  <Flex align="center">
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
                      <Text color="#8998b1">
                        {user.profile_songs[0].artist}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <IconButton
                    icon={FaEllipsisV}
                    fontSize="18px"
                    color="#8998b1"
                    aria-label="more"
                    variant="ghost"
                  />
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

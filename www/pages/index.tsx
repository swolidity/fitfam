import React from "react";
import NextLink from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Flex, Box, Image, Link } from "@chakra-ui/core";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      username
      picture
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "loading...";
  if (error) return <div>{error.message}</div>;

  return (
    <Box p={6} margin="0 auto" maxWidth="600px">
      {data.users.map(user => (
        <Flex key={user.id} align="center">
          <NextLink href="/[username]" as={`/${user.username}`}>
            <Image
              src={user.picture}
              alt={user.username}
              rounded="full"
              width="45px"
              mr={3}
              fallbackSrc="false"
            />
          </NextLink>

          <NextLink href="/[username]" as={`/${user.username}`}>
            <Link fontWeight="semibold">{user.username}</Link>
          </NextLink>
        </Flex>
      ))}
    </Box>
  );
};

export default Home;

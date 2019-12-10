import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Box } from "@chakra-ui/core";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      username
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "loading...";
  if (error) return <div>{error.message}</div>;

  return (
    <Box p={6}>
      {data.users.map(user => (
        <div key={user.id}>
          <Link href="/[username]" as={`/${user.username}`}>
            <a>{user.username}</a>
          </Link>
        </div>
      ))}
    </Box>
  );
};

export default Home;

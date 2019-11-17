import React from "react";
import Head from "next/head";
import App from "../components/App";
import { Flex, Box, Image } from "@chakra-ui/core";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "loading...";

  console.log(data);

  return (
    <App>
      <Head>
        <title>FitFam - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex px={6} py={4} backgroundColor="#0D6CFF">
        <Box>
          <Image
            src="/fitfam@2x.png"
            alt="FitFam"
            height="45px"
            ignoreFallback
          />
        </Box>
      </Flex>
    </App>
  );
};

export default withApollo(Home);

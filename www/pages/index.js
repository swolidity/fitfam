import React from "react";
import Head from "next/head";
import App from "../components/App";
import { Flex, Box, Image } from "@chakra-ui/core";

const Home = () => (
  <App>
    <Head>
      <title>FitFam - Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Flex px={6} py={4} backgroundColor="#0D6CFF">
      <Box>
        <Image src="/fitfam@2x.png" alt="FitFam" height="45px" ignoreFallback />
      </Box>
    </Flex>
  </App>
);

export default Home;

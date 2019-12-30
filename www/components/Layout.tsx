import React from "react";
import Head from "next/head";
import {
  ThemeProvider,
  CSSReset,
  Flex,
  Box,
  Link,
  Image,
  Button
} from "@chakra-ui/core";
import NextLink from "next/link";

type LayoutProps = {
  loggedInUser: any;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  loggedInUser
}) => (
  <ThemeProvider>
    <CSSReset />

    <Head>
      <title>FitFam - Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Flex
      px={6}
      py={4}
      borderBottom="2px solid"
      borderColor="#f8f8f8"
      align="center"
      justify="space-between"
    >
      <Box>
        <NextLink href="/">
          <Link>
            <Image
              src="/fitfam-blue@2x.png"
              alt="FitFam"
              height="25px"
              ignoreFallback
            />
          </Link>
        </NextLink>
      </Box>

      {loggedInUser ? (
        <Image
          src={loggedInUser.picture}
          alt={loggedInUser.name}
          height="35px"
          rounded="full"
          ignoreFallback
        />
      ) : (
        <Button>
          <Link href="/api/facebook-auth">Login</Link>
        </Button>
      )}
    </Flex>
    {children}
  </ThemeProvider>
);

export default Layout;

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
import LoggedInUserPicMenu from "../components/LoggedInUserPicMenu";
import cookie from "cookie";
import redirect from "../lib/redirect";
import { FaDiscord } from "react-icons/fa";

type LayoutProps = {
  loggedInUser: any;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  loggedInUser
}) => {
  const signout = () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, "/signin");
    });
  };

  return (
    <ThemeProvider>
      <CSSReset />

      <Head>
        <title>FitFam - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box height="100vh">
        <Flex
          px={6}
          py={4}
          borderBottom="2px solid"
          borderColor="#f8f8f8"
          align="center"
          justify="space-between"
          backgroundColor="white"
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
            <LoggedInUserPicMenu user={loggedInUser} />
          ) : (
            <Button>
              <Link href="/api/facebook-auth">Login</Link>
            </Button>
          )}
        </Flex>
        <Box>{children}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

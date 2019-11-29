import Head from "next/head";
import {
  ThemeProvider,
  CSSReset,
  Flex,
  Box,
  Link,
  Image
} from "@chakra-ui/core";
import NextLink from "next/link";

export default ({ children }) => (
  <ThemeProvider>
    <CSSReset />

    <Head>
      <title>FitFam - Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Flex px={6} py={4} borderBottom="2px solid" borderColor="#f8f8f8">
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
    </Flex>
    {children}
  </ThemeProvider>
);

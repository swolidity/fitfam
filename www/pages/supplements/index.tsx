import React from "react";
import { Flex, Box, Heading, Stack, Image, Text, Link } from "@chakra-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import NextLink from "next/link";

const GET_SUPPLEMENTS = gql`
  query GetSupplements {
    supplements {
      id
      name
      url
      image_url
    }
  }
`;

const SupplementsPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_SUPPLEMENTS);

  if (loading) return <Box p={6}>Loading...</Box>;

  return (
    <Box p={6}>
      <Heading>Supplements</Heading>

      <Stack spacing={3}>
        {data.supplements.map(supplement => (
          <Flex align="center" key={supplement.id}>
            <Image src={supplement.image_url} ignoreFallback />
            <Link isExternal href={supplement.url}>
              <Text>{supplement.name}</Text>
            </Link>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default SupplementsPage;

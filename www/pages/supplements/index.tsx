import React from "react";
import { Flex, Box, Heading, Stack, Image, Text } from "@chakra-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
            <Text>{supplement.name}</Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default SupplementsPage;

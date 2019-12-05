import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Flex,
  Box,
  Image,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup
} from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";

const GET_USER_PROFILE = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      username
      bio
      email
      picture
      bodyweights(last: 1) {
        id
        weight
        createdAt
      }
    }
  }
`;

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      where: {
        username: "andy"
      }
    }
  });

  if (loading) return <div>loading...</div>;

  return (
    <Box p={6}>
      <Flex align="center">
        <Image
          src={data.user.picture}
          alt={data.user.name}
          height="80px"
          rounded="full"
          mr={4}
          ignoreFallback
        />
        <Text fontWeight="bold" fontSize="2xl">
          {data.user.username}
        </Text>
      </Flex>

      <Text>{data.user.bio}</Text>

      <Stat>
        <StatLabel>Weight</StatLabel>
        <StatNumber>{data.user.bodyweights[0].weight} lbs</StatNumber>
        <StatHelpText>
          {formatDistanceToNow(new Date(data.user.bodyweights[0].createdAt))}{" "}
          ago
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default ProfilePage;

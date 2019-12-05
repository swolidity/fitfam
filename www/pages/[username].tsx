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
  StatGroup,
  Link
} from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

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
    <Flex p={6}>
      <Box width={["100%", "25%"]}>
        <Flex align="center" mb={3}>
          <Image
            src={data.user.picture}
            alt={data.user.name}
            height="80px"
            rounded="full"
            mr={4}
            ignoreFallback
          />

          <Box>
            <Text fontWeight="bold" fontSize="2xl">
              {data.user.name}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              @{data.user.username}
            </Text>
          </Box>
        </Flex>

        <Text mb={3}>{data.user.bio}</Text>

        <NextLink
          href="/[username]/bodyweight"
          as={`/${data.user.username}/bodyweight`}
        >
          <Link>
            <Stat border="1px solid #ccc" borderRadius="5px" p={2}>
              <StatLabel>Weight</StatLabel>
              <StatNumber>{data.user.bodyweights[0].weight} lbs</StatNumber>
              <StatHelpText>
                {formatDistanceToNow(
                  new Date(data.user.bodyweights[0].createdAt)
                )}{" "}
                ago
              </StatHelpText>
            </Stat>
          </Link>
        </NextLink>
      </Box>

      <Box width={["100%", "75%"]}>Workouts</Box>
    </Flex>
  );
};

export default ProfilePage;

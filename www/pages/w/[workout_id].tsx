import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Flex, Box, Heading, Image, Text, Link } from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

const GET_WORKOUT = gql`
  query GET_WORKOUT($where: WorkoutWhereUniqueInput!) {
    workout(where: $where) {
      id
      title
      createdAt
      user {
        id
        name
        username
        picture
      }
      logs {
        id
        exercise {
          id
          name
        }
        weight
        reps
        createdAt
        updatedAt
      }
    }
  }
`;

const WorkoutPage = () => {
  const router = useRouter();
  const { loading, data } = useQuery(GET_WORKOUT, {
    variables: {
      where: {
        id: router.query.workout_id
      }
    }
  });

  if (loading) return <Box p={6}>Loading...</Box>;

  return (
    <Box p={6}>
      <Heading>{data.workout.title}</Heading>

      <Flex align="center" mb={4}>
        <NextLink href="/[username]" as={`/${data.workout.user.username}`}>
          <Link>
            <Image
              src={data.workout.user.picture}
              alt={data.workout.user.username}
              ignoreFallback
              rounded="full"
              width="45px"
              mr={3}
            />
          </Link>
        </NextLink>

        <Box>
          <NextLink href="/[username]" as={`/${data.workout.user.username}`}>
            <Link>
              <Text fontWeight="semibold">{data.workout.user.username}</Text>
            </Link>
          </NextLink>
          <Text>
            {formatDistanceToNow(new Date(data.workout.createdAt))} ago
          </Text>
        </Box>
      </Flex>

      {data.workout.logs.map(log => (
        <Box>
          {log.exercise.name} {log.weight} x {log.reps}
        </Box>
      ))}
    </Box>
  );
};

export default WorkoutPage;

import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Flex,
  Stack,
  Box,
  Heading,
  Image,
  Text,
  Link,
  Button
} from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";
import DeleteWorkoutButton from "../../components/DeleteWorkoutButton";

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
    <Box p={6} maxWidth="600px" margin="0 auto">
      <Heading mb={2}>{data.workout.title}</Heading>

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

      <Stack spacing={2} mb={3}>
        {data.workout.logs.map(log => (
          <Box p={2} backgroundColor="#fafafa">
            {log.exercise.name} {log.weight} x {log.reps}
          </Box>
        ))}
      </Stack>

      <NextLink href="/w/[workout_id]/edit" as={`/w/${data.workout.id}/edit`}>
        <Button mr={2}>Edit</Button>
      </NextLink>

      <DeleteWorkoutButton workoutId={data.workout.id} />
    </Box>
  );
};

export default WorkoutPage;

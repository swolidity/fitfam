import React, { useState, useMemo } from "react";
import { Box, Spinner, Heading, FormLabel, Input, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Track from "../../../components/Track";
import { NextPage } from "next";

const GET_WORKOUT = gql`
  query GetWorkout($where: WorkoutWhereUniqueInput!) {
    workout(where: $where) {
      id
      title
      createdAt
      logs {
        id
        exercise {
          id
          name
        }
        weight
        reps
      }
    }
  }
`;

const EditWorkoutPage: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_WORKOUT, {
    variables: {
      where: {
        id: router.query.workout_id,
      },
    },
  });
  const [startDate, setStartDate] = useState(
    data ? new Date(data?.workout.createdAt).toISOString().slice(0, 19) : null
  );
  const logs = useMemo(() => {
    const normalizedLogs = {};
    data?.workout?.logs.forEach((log) => {
      normalizedLogs[log.exercise.id] = {
        ...log.exercise,
        ...(normalizedLogs[log.exercise.id]?.sets
          ? {
              sets: [
                ...normalizedLogs[log.exercise.id].sets,
                { logId: log.id, weight: log.weight, reps: log.reps },
              ],
            }
          : { sets: [] }),
      };
    });

    return normalizedLogs;
  }, [data]);

  if (loading)
    return (
      <Box p={6}>
        <Spinner />
      </Box>
    );

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  return (
    <Box p={6}>
      <Heading>{data.workout.title}</Heading>

      <FormLabel htmlFor="startDate">Start Time</FormLabel>
      <Input
        type="datetime-local"
        onChange={handleStartDateChange}
        value={startDate}
      />

      <Track workout={data.workout} logs={logs} />
    </Box>
  );
};

export default EditWorkoutPage;

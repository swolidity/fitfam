import React from "react";
import { Button } from "@chakra-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_WORKOUT_QUERY = gql`
  mutation DeleteOneWorkout($where: WorkoutWhereUniqueInput!) {
    deleteOneWorkout(where: $where) {
      id
    }
  }
`;

type DeleteWorkoutButtonProps = {
  workoutId: string;
};

const DeleteWorkoutButton: React.FC<DeleteWorkoutButtonProps> = ({
  workoutId
}) => {
  const [deleteWorkout, { data }] = useMutation(DELETE_WORKOUT_QUERY, {
    variables: {
      where: {
        id: workoutId
      }
    }
  });

  const handleDelete = () => {
    const answer = confirm("Are you sure you want to delete this workout?");

    if (answer) deleteWorkout();
  };

  return (
    <Button variantColor="red" onClick={handleDelete}>
      Delete Workout
    </Button>
  );
};

export default DeleteWorkoutButton;

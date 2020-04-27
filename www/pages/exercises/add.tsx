import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Box, Heading, Input, Button } from "@chakra-ui/core";
import slug from "slug";

const ADD_EXERCISE = gql`
  mutation AddExercise($data: ExerciseCreateInput!) {
    createOneExercise(data: $data) {
      id
      name
    }
  }
`;

const AddExercisePage = () => {
  const [name, setName] = useState("");
  const [addExercise, { data }] = useMutation(ADD_EXERCISE, {
    variables: {
      data: {
        name: name,
        slug: slug(name)
      }
    }
  });

  const handleNameChange = (e): void => {
    setName(e.target.value);
  };

  const handleAdd = (): void => {
    addExercise();
  };

  return (
    <Box p={6}>
      <Heading mb={2}>Add Exercise</Heading>

      <Input
        type="text"
        placeholder="Name"
        mb={2}
        value={name}
        onChange={handleNameChange}
      />

      <Button onClick={handleAdd}>Add</Button>
    </Box>
  );
};

export default AddExercisePage;

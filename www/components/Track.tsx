import React, { useReducer } from "react";
import { Stack, Box, Button, Input, Heading } from "@chakra-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useCombobox } from "downshift";

const TRACK_AUTOCOMPLETE = gql`
  query OneTrackAutoComplete($name: String!) {
    onetrack(name: $name) {
      id
      name
    }
  }
`;

const initialState = { volume: 0, exercises: {} };

function workoutReducer(state, action): any {
  switch (action.type) {
    case "addExercise":
      console.log({ action });
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.payload.id]: { ...action.payload, weight: 0, reps: 1 }
        }
      };
    case "weightChange":
      console.log(action.payload);

      const exercises = {
        ...state.exercises,
        [action.payload.id]: {
          ...state.exercises[action.payload.id],
          weight: parseInt(action.payload.value)
        }
      };

      let volume = 0;

      console.log({ exercises });

      Object.keys(exercises).forEach(key => {
        const exercise = exercises[key];

        volume += exercise.weight * exercise.reps;
      });

      console.log({ volume });

      return {
        ...state,
        exercises,
        volume
      };
  }
}

const Track: React.FC = () => {
  const { data, loading, refetch } = useQuery(TRACK_AUTOCOMPLETE, {
    variables: {
      name: ""
    }
  });
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    items: data?.onetrack,
    onInputValueChange: ({ inputValue }) => {
      refetch({
        name: inputValue
      });
    },
    onSelectedItemChange: changes => {
      dispatch({ type: "addExercise", payload: changes.selectedItem });
    },
    itemToString: (item: { id: string; name: string }) => item.name
  });

  console.log({ state });
  return (
    <Box width="100%">
      <Input placeholder="Track something" width="100%" {...getInputProps()} />

      <Box mb={5}>
        <ul {...getMenuProps()}>
          {!loading &&
            isOpen &&
            data?.onetrack.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </Box>

      <Stack spacing={2}>
        <Heading>Volume: {state.volume}</Heading>
        {Object.keys(state.exercises).map(key => {
          const exercise = state.exercises[key];

          return (
            <Box
              key={exercise.id}
              p={6}
              backgroundColor="white"
              shadow="sm"
              borderRadius="5px"
            >
              {exercise.name}

              <Input
                placeholder="Weight"
                name={`weight-${exercise.id}`}
                onChange={e => {
                  dispatch({
                    type: "weightChange",
                    payload: {
                      id: exercise.id,
                      value: e.target.value
                    }
                  });
                }}
              />
              <Input placeholder="Reps" defaultValue={0} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Track;

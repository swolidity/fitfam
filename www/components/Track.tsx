import React, { useReducer } from "react";
import {
  Stack,
  Flex,
  Box,
  Button,
  Input,
  Heading,
  Text,
  DrawerContent,
} from "@chakra-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useCombobox } from "downshift";
import { useImmerReducer } from "use-immer";

const TRACK_AUTOCOMPLETE = gql`
  query OneTrackAutoComplete($name: String!) {
    onetrack(name: $name) {
      id
      name
    }
  }
`;

const SAVE_WORKOUT = gql`
  mutation SaveWorkout($input: SaveWorkoutInput!) {
    saveWorkout(input: $input) {
      id
    }
  }
`;

type TrackProps = {
  workout?: any;
  logs?: any;
};

// TODO: normalize state. make flat

function workoutReducer(draft, action): any {
  switch (action.type) {
    case "changeWorkoutName":
      draft.title = action.payload.value;

    case "addExercise":
      draft.exercises[action.payload.id] = {
        ...action.payload,
        sets: [{ weight: 0, reps: 1 }],
      };

      return;

    case "addSet":
      draft.exercises[action.payload.id].sets.push({ weight: 0, reps: 1 });
      return;
    case "weightChange":
      draft.exercises[action.payload.id].sets[action.payload.index] = {
        ...draft.exercises[action.payload.id].sets[action.payload.index],
        weight: parseInt(action.payload.value),
      };

      let volume = 0;

      Object.keys(draft.exercises).forEach((key) => {
        const exercise = draft.exercises[key];

        const setVolume = exercise.sets.reduce((total, set) => {
          const v = set.weight * set.reps;
          return total + v;
        }, 0);

        volume += setVolume;
      });

      draft.volume = volume;

      return;
    case "repChange":
      draft.exercises[action.payload.id].sets[action.payload.index] = {
        ...draft.exercises[action.payload.id].sets[action.payload.index],
        reps: parseInt(action.payload.value),
      };

      let repVolume = 0;

      Object.keys(draft.exercises).forEach((key) => {
        const exercise = draft.exercises[key];

        const newRepVolume = exercise.sets.reduce((total, set) => {
          return total + set.weight * set.reps;
        }, 0);

        repVolume += newRepVolume;
      });

      draft.volume = repVolume;

      return;

    case "deleteSet":
      const answer = confirm("Are you sure you want to delete this set?");

      if (answer) {
        draft.exercises[action.payload.id].sets.splice(action.payload.index, 1);

        if (action.payload.logId) {
          draft.deleteLogs.push(action.payload.logId);
        }
      }

      return;
  }
}

const Track: React.FC<TrackProps> = ({ workout, logs }) => {
  const { data, loading, refetch } = useQuery(TRACK_AUTOCOMPLETE, {
    variables: {
      name: "",
    },
  });
  const [state, dispatch] = useImmerReducer(workoutReducer, {
    title: workout.title || "",
    volume: 0,
    exercises: logs || {},
    deleteLogs: [],
  });

  const [saveWorkout, { data: mutationData }] = useMutation(SAVE_WORKOUT, {});

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: data?.onetrack,
    onInputValueChange: ({ inputValue }) => {
      refetch({
        name: inputValue,
      });
    },
    onSelectedItemChange: (changes) => {
      dispatch({ type: "addExercise", payload: changes.selectedItem });
    },
    itemToString: (item: { id: string; name: string }) => item.name,
  });

  const handleSaveWorkout = (): void => {
    const exercises = [];
    Object.keys(state.exercises).map((key) => {
      const exercise = state.exercises[key];

      const { ["__typename"]: remove, ...keep } = exercise;

      exercises.push(keep);
    });

    saveWorkout({
      variables: {
        input: {
          workoutId: workout.id,
          title: state.title,
          volume: state.volume,
          exercises,
          deleteLogs: state.deleteLogs,
        },
      },
    });
  };

  return (
    <Box width="100%" p={6}>
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

      <Input
        placeholder="Workout Name"
        value={state.title}
        onChange={(e) => {
          dispatch({
            type: "changeWorkoutName",
            payload: {
              value: e.target.value,
            },
          });
        }}
      />

      <Heading mb={3}>Volume: {state.volume}</Heading>

      <Stack spacing={2} mb={3}>
        {Object.keys(state.exercises).map((key) => {
          const exercise = state.exercises[key];

          return (
            <Box
              key={exercise.id}
              p={6}
              backgroundColor="white"
              shadow="sm"
              borderRadius="5px"
            >
              {exercise.name} x {exercise.sets.length}
              {exercise.sets.map((set, i) => (
                <Flex key={i} mb={3} justify="space-between">
                  <Box>
                    <Flex align="center">
                      <Input
                        mr={2}
                        maxWidth="100px"
                        placeholder="Weight"
                        name={`weight-${exercise.id}`}
                        onChange={(e) => {
                          dispatch({
                            type: "weightChange",
                            payload: {
                              id: exercise.id,
                              value: e.target.value,
                              index: i,
                            },
                          });
                        }}
                        value={set.weight}
                      />
                      <Text mr={2}>X</Text>
                      <Input
                        maxWidth="100px"
                        placeholder="Reps"
                        onChange={(e) => {
                          dispatch({
                            type: "repChange",
                            payload: {
                              id: exercise.id,
                              value: e.target.value,
                              index: i,
                            },
                          });
                        }}
                        value={set.reps}
                      />
                    </Flex>
                  </Box>
                  <Button
                    onClick={(e) => {
                      dispatch({
                        type: "deleteSet",
                        payload: {
                          id: exercise.id,
                          logId: set.logId,
                          index: i,
                        },
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
              ))}
              <Button
                p={2}
                onClick={() => {
                  dispatch({
                    type: "addSet",
                    payload: {
                      id: exercise.id,
                    },
                  });
                }}
              >
                Add Set
              </Button>
            </Box>
          );
        })}
      </Stack>

      <Button onClick={handleSaveWorkout}>Save</Button>
    </Box>
  );
};

export default Track;

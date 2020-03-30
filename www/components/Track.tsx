import React, { useReducer } from "react";
import { Stack, Box, Button, Input, Heading } from "@chakra-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

const initialState = { title: "", volume: 0, exercises: {} };

// TODO: normalize state. make flat

function workoutReducer(state, action): any {
  switch (action.type) {
    case "changeWorkoutName":
      return {
        ...state,
        title: action.payload.value
      };
    case "addExercise":
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.payload.id]: {
            ...action.payload,
            sets: [{ weight: 0, reps: 1 }]
          }
        }
      };
    case "addSet":
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.payload.id]: {
            ...state.exercises[action.payload.id],
            sets: [
              ...state.exercises[action.payload.id].sets,
              { weight: 0, reps: 1 }
            ]
          }
        }
      };
    case "weightChange":
      const exercises = {
        ...state.exercises,
        [action.payload.id]: {
          ...state.exercises[action.payload.id],
          sets: [
            ...state.exercises[action.payload.id].sets.slice(
              0,
              action.payload.index
            ),
            {
              ...state.exercises[action.payload.id].sets[action.payload.index],
              weight: parseInt(action.payload.value)
            },
            ...state.exercises[action.payload.id].sets.slice(
              action.payload.index + 1
            )
          ]
        }
      };

      let volume = 0;

      Object.keys(exercises).forEach(key => {
        const exercise = exercises[key];

        const setVolume = exercise.sets.reduce((total, set) => {
          const v = set.weight * set.reps;
          return total + v;
        }, 0);

        volume += setVolume;
      });

      return {
        ...state,
        exercises,
        volume
      };

    case "repChange":
      const repExercises = {
        ...state.exercises,
        [action.payload.id]: {
          ...state.exercises[action.payload.id],
          sets: [
            ...state.exercises[action.payload.id].sets.slice(
              0,
              action.payload.index
            ),
            {
              ...state.exercises[action.payload.id].sets[action.payload.index],
              reps: parseInt(action.payload.value)
            },
            ...state.exercises[action.payload.id].sets.slice(
              action.payload.index + 1
            )
          ]
        }
      };

      let repVolume = 0;

      Object.keys(repExercises).forEach(key => {
        const exercise = repExercises[key];

        const newRepVolume = exercise.sets.reduce((total, set) => {
          return total + set.weight * set.reps;
        }, 0);

        repVolume += newRepVolume;
      });

      return {
        ...state,
        exercises: repExercises,
        volume: repVolume
      };
  }
}

const Track: React.FC<TrackProps> = ({ workout, logs }) => {
  const { data, loading, refetch } = useQuery(TRACK_AUTOCOMPLETE, {
    variables: {
      name: ""
    }
  });
  const [state, dispatch] = useReducer(workoutReducer, {
    title: workout.title || "",
    volume: 0,
    exercises: logs || {}
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

  const handleSaveWorkout = (): void => {
    const exercises = [];
    Object.keys(state.exercises).map(key => {
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
          exercises
        }
      }
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
        onChange={e => {
          dispatch({
            type: "changeWorkoutName",
            payload: {
              value: e.target.value
            }
          });
        }}
      />

      <Heading mb={3}>Volume: {state.volume}</Heading>

      <Stack spacing={2} mb={3}>
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
              {exercise.name} x {exercise.sets.length}
              {exercise.sets.map((set, i) => (
                <Box key={i} mb={3}>
                  <Input
                    mb={2}
                    placeholder="Weight"
                    name={`weight-${exercise.id}`}
                    onChange={e => {
                      dispatch({
                        type: "weightChange",
                        payload: {
                          id: exercise.id,
                          value: e.target.value,
                          index: i
                        }
                      });
                    }}
                    value={set.weight}
                  />
                  <Input
                    placeholder="Reps"
                    onChange={e => {
                      dispatch({
                        type: "repChange",
                        payload: {
                          id: exercise.id,
                          value: e.target.value,
                          index: i
                        }
                      });
                    }}
                    value={set.reps}
                  />
                </Box>
              ))}
              <Button
                onClick={() => {
                  dispatch({
                    type: "addSet",
                    payload: {
                      id: exercise.id
                    }
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

import { objectType, inputObjectType } from "nexus";

export const Workout = objectType({
  name: "Workout",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.title();
    t.model.slug();
    t.model.logs({
      ordering: true
    });
    t.model.createdAt();
    t.model.updatedAt();
  }
});

export const WorkoutSetsInput = inputObjectType({
  name: "WorkoutSetsInput",
  definition(t) {
    t.id("logId");
    t.float("weight", {
      required: true
    });
    t.int("reps", { required: true });
  }
});

export const WorkoutExerciseInput = inputObjectType({
  name: "WorkoutExerciseInput",
  definition(t) {
    t.id("id");
    t.string("name");
    t.list.field("sets", {
      type: WorkoutSetsInput,
      required: true
    });
  }
});

export const SaveWorkoutInput = inputObjectType({
  name: "SaveWorkoutInput",
  definition(t) {
    t.id("workoutId");
    t.string("title", { required: true });
    t.int("volume");
    t.list.field("exercises", {
      type: WorkoutExerciseInput,
      required: true
    });
  }
});

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

export const WorkoutExerciseInput = inputObjectType({
  name: "WorkoutExerciseInput",
  definition(t) {
    t.int("reps");
    t.float("weight");
  }
});

export const SaveWorkoutInput = inputObjectType({
  name: "SaveWorkoutInput",
  definition(t) {
    t.string("title", { required: true });
    t.list.field("exercises", {
      type: WorkoutExerciseInput
    });
  }
});

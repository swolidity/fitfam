import { schema } from "nexus";

export const WorkoutLog = schema.objectType({
  name: "WorkoutLog",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.exercise();
    t.model.workout();
    t.model.weight();
    t.model.reps();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

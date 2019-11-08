import { objectType } from "nexus";

export const Workout = objectType({
  name: "Workout",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

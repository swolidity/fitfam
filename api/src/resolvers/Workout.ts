import { objectType } from "nexus";

export const Workout = objectType({
  name: "Workout",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.slug();
    t.model.logs();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

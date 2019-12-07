import { objectType } from "nexus";

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

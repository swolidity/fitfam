import { objectType } from "nexus";

export const Exercise = objectType({
  name: "Exercise",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

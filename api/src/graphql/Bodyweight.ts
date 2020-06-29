import { schema } from "nexus";

export const Bodyweight = schema.objectType({
  name: "Bodyweight",
  definition(t) {
    t.model.id();
    t.model.weight();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

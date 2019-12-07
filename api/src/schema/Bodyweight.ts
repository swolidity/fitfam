import { objectType } from "nexus";

export const Bodyweight = objectType({
  name: "Bodyweight",
  definition(t) {
    t.model.id();
    t.model.weight();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

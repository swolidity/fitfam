import { objectType } from "nexus";

export const SupplementStack = objectType({
  name: "SupplementStack",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.supplements();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

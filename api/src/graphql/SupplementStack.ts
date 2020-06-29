import { schema } from "nexus";

export const SupplementStack = schema.objectType({
  name: "SupplementStack",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.supplements();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

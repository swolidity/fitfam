import { schema } from "nexus";

export const Supplement = schema.objectType({
  name: "Supplement",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.url();
    t.model.image_url();
    t.model.brand();
    t.model.added_by();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

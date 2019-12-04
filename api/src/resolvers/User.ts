import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.username();
    t.model.bio();
    t.model.picture();
    t.model.bodyweights({
      ordering: true
    });
    t.model.createdAt();
    t.model.updatedAt();
  }
});

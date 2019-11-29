import { mutationType } from "nexus";

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneBodyweight({
      authorize: false
    });
  }
});

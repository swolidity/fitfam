import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users({
      type: "User",
      ordering: true
    });

    t.crud.bodyweight({});
    t.crud.bodyweights({
      type: "Bodyweight",
      ordering: true
    });

    t.field("getLoggedInUser", {
      type: "User",
      nullable: true,
      resolve: async (root, args, ctx) => {
        return ctx.user;
      }
    });
  }
});

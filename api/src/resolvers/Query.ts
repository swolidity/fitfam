import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users();

    t.field("getLoggedInUser", {
      type: "User",
      nullable: true,
      resolve: async (root, args, ctx) => {
        return ctx.user;
      }
    });
  }
});

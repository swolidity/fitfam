import { queryType, stringArg } from "nexus";
import { extract } from "oembed-parser";

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

    t.crud.workout();

    t.field("oembed", {
      type: "Oembed",
      args: {
        url: stringArg()
      },
      resolve: async (root, { url }, ctx) => {
        const oembed = await extract(url);

        return oembed;
      }
    });
  }
});

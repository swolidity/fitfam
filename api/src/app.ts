import { schema } from "nexus";
import { createContext } from "./context";
import { use } from "nexus";
import { prisma } from "nexus-plugin-prisma";

use(
  prisma({
    features: {
      crud: true,
    },
  })
);

schema.addToContext(async (req) => createContext(req));

if (process.env.NODE_ENV === "development") require("nexus").default.reset();

const app = require("nexus").default;

require("./graphql/User");
require("./graphql/Exercise");
require("./graphql/Bodyweight");
require("./graphql/Oembed");
require("./graphql/ProfileSong");
require("./graphql/Supplement");
require("./graphql/SupplementStack");
require("./graphql/Workout");
require("./graphql/WorkoutLog");
require("./graphql/Mutation");
require("./graphql/Query");

app.assemble();

export default app.server.handlers.graphql;

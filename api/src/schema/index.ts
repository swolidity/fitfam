import * as Nexus from "nexus";
import { nexusPrismaPlugin } from "nexus-prisma";

import * as Query from "./Query";
import * as Mutation from "./Mutation";
import * as User from "./User";
import * as Workout from "./Workout";
import * as WorkoutLog from "./WorkoutLog";
import * as Bodyweight from "./Bodyweight";
import * as ProfileSong from "./ProfileSong";
import * as Exercise from "./Exercise";
import * as Oembed from "./Oembed";
import * as Supplement from "./Supplement";
import * as SupplementStack from "./SupplementStack";

import * as path from "path";

export default Nexus.makeSchema({
  types: [
    Query,
    Mutation,
    User,
    Workout,
    WorkoutLog,
    Bodyweight,
    ProfileSong,
    Exercise,
    Oembed,
    Supplement,
    SupplementStack
  ],
  plugins: [nexusPrismaPlugin(), Nexus.fieldAuthorizePlugin()],
  outputs: {
    typegen: path.join(
      __dirname,
      "../../node_modules/@types/nexus-typegen/index.d.ts"
    ),
    schema: path.join(__dirname, "../generated/schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma"
      },
      {
        source: require.resolve("../context"),
        alias: "Context"
      }
    ],
    contextType: "Context.Context"
  }
});

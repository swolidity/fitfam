import { ApolloServer } from "apollo-server";
import { Photon } from "@generated/photon";
import { makeSchema, asNexusMethod } from "nexus";
import { nexusPrismaPlugin } from "nexus-prisma";
import * as types from "./resolvers";

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: ctx => ctx.photon
});

const schema = makeSchema({
  types,
  plugins: [nexusPrisma]
});

const server = new ApolloServer({
  schema,
  context: { photon }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

import { schema } from "nexus";
//import { createContext } from "./context";
import { use } from "nexus";
import { prisma } from "nexus-plugin-prisma";

use(
  prisma({
    features: {
      crud: true,
    },
  })
);

//schema.addToContext(async (req) => createContext(req));

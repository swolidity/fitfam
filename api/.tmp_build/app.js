"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { createContext } from "./context";
const nexus_1 = require("nexus");
const nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
nexus_1.use(nexus_plugin_prisma_1.prisma({
    features: {
        crud: true,
    },
}));
//schema.addToContext(async (req) => createContext(req));

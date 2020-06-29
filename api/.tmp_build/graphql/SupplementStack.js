"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplementStack = void 0;
const nexus_1 = require("nexus");
exports.SupplementStack = nexus_1.schema.objectType({
    name: "SupplementStack",
    definition(t) {
        t.model.id();
        t.model.user();
        t.model.supplements();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

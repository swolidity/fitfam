"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const nexus_1 = require("nexus");
exports.Exercise = nexus_1.schema.objectType({
    name: "Exercise",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bodyweight = void 0;
const nexus_1 = require("nexus");
exports.Bodyweight = nexus_1.schema.objectType({
    name: "Bodyweight",
    definition(t) {
        t.model.id();
        t.model.weight();
        t.model.user();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplement = void 0;
const nexus_1 = require("nexus");
exports.Supplement = nexus_1.schema.objectType({
    name: "Supplement",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.url();
        t.model.image_url();
        t.model.brand();
        t.model.added_by();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const nexus_1 = require("nexus");
exports.User = nexus_1.schema.objectType({
    name: "User",
    definition(t) {
        t.model.id();
        t.model.email();
        t.model.name();
        t.model.username();
        t.model.bio();
        t.model.picture();
        t.model.bodyweights({
            ordering: true,
            pagination: true,
        });
        t.model.profile_songs({
            ordering: true,
            pagination: true,
        });
        t.model.workouts({
            ordering: true,
            pagination: true,
        });
        t.model.supplement_stack();
        t.model.instagram();
        t.model.height();
        t.model.dateOfBirth();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

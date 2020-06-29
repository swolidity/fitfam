"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutLog = void 0;
const nexus_1 = require("nexus");
exports.WorkoutLog = nexus_1.schema.objectType({
    name: "WorkoutLog",
    definition(t) {
        t.model.id();
        t.model.user();
        t.model.exercise();
        t.model.workout();
        t.model.weight();
        t.model.reps();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

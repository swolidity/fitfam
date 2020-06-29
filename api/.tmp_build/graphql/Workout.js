"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveWorkoutInput = exports.WorkoutExerciseInput = exports.WorkoutSetsInput = exports.Workout = void 0;
const nexus_1 = require("nexus");
exports.Workout = nexus_1.schema.objectType({
    name: "Workout",
    definition(t) {
        t.model.id();
        t.model.user();
        t.model.title();
        t.model.slug();
        t.model.logs({
            ordering: true,
        });
        t.model.createdAt();
        t.model.updatedAt();
    },
});
exports.WorkoutSetsInput = nexus_1.schema.inputObjectType({
    name: "WorkoutSetsInput",
    definition(t) {
        t.id("logId");
        t.float("weight", {
            required: true,
        });
        t.int("reps", { required: true });
    },
});
exports.WorkoutExerciseInput = nexus_1.schema.inputObjectType({
    name: "WorkoutExerciseInput",
    definition(t) {
        t.id("id");
        t.string("name");
        t.list.field("sets", {
            type: exports.WorkoutSetsInput,
            required: true,
        });
    },
});
exports.SaveWorkoutInput = nexus_1.schema.inputObjectType({
    name: "SaveWorkoutInput",
    definition(t) {
        t.id("workoutId");
        t.string("title", { required: true });
        t.int("volume");
        t.list.field("exercises", {
            type: exports.WorkoutExerciseInput,
            required: true,
        });
        t.list.id("deleteLogs");
    },
});

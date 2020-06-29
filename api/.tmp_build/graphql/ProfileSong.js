"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSong = void 0;
const nexus_1 = require("nexus");
exports.ProfileSong = nexus_1.schema.objectType({
    name: "ProfileSong",
    definition(t) {
        t.model.id();
        t.model.url();
        t.model.thumbnail();
        t.model.title();
        t.model.artist();
        t.model.user();
        t.model.provider();
        t.model.createdAt();
        t.model.updatedAt();
    },
});

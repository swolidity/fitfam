import { schema } from "nexus";

export const ProfileSong = schema.objectType({
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

import { objectType } from "nexus";

export const ProfileSong = objectType({
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
  }
});

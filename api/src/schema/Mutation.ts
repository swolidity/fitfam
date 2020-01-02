import { mutationType, stringArg } from "nexus";
import { extract } from "oembed-parser";

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneBodyweight({
      authorize: () => false
    });

    t.crud.createOneProfileSong();

    t.crud.createOneExercise();
    t.crud.createOneWorkout();
    t.crud.createOneWorkoutLog();

    t.crud.createOneSupplement();

    t.field("addProfileSong", {
      type: "ProfileSong",
      args: {
        url: stringArg(),
        title: stringArg(),
        artist: stringArg(),
        provider: stringArg(),
        thumbnail: stringArg()
      },
      resolve: async (
        root,
        { url, title, artist, provider, thumbnail },
        ctx
      ) => {
        const profileSong = await ctx.photon.profileSongs.create({
          data: {
            url,
            title,
            artist,
            provider: provider,
            thumbnail: thumbnail,
            user: {
              connect: {
                id: ctx.user?.id
              }
            }
          }
        });

        return profileSong;
      }
    });

    t.field("editBio", {
      type: "User",
      args: {
        bio: stringArg()
      },
      resolve: async (root, { bio }, ctx) => {
        const user = ctx.photon.users.update({
          where: {
            id: ctx.user?.id
          },
          data: {
            bio
          }
        });

        return user;
      }
    });
  }
});

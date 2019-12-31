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

    t.field("addProfileSong", {
      type: "ProfileSong",
      args: {
        url: stringArg()
      },
      resolve: async (root, { url }, ctx) => {
        const oembed = await extract(url);

        console.log("OEMBED", oembed);

        const profileSong = await ctx.photon.profileSongs.create({
          data: {
            url: url,
            title: oembed.title,
            artist: oembed.author_name,
            provider: oembed.provider_name,
            thumbnail: oembed.thumbnail_url,
            user: {
              connect: {
                id: ctx.user.id
              }
            }
          }
        });

        return profileSong;
      }
    });
  }
});

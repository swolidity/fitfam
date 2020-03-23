import { mutationType, stringArg, arg } from "nexus";
import { extract } from "oembed-parser";
import slug from "slug";

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneBodyweight({
      authorize: () => false
    });

    t.crud.createOneProfileSong();

    t.crud.createOneExercise();
    t.crud.createOneWorkout();
    t.crud.deleteOneWorkout();
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
        const profileSong = await ctx.prisma.profileSongs.create({
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

    t.field("editProfile", {
      type: "User",
      args: {
        picture: stringArg({
          nullable: true
        }),
        bio: stringArg({
          nullable: true
        }),
        instagram: stringArg({
          nullable: true
        })
      },
      resolve: async (root, { picture, bio, instagram }, ctx) => {
        const user = ctx.prisma.users.update({
          where: {
            id: ctx.user?.id
          },
          data: {
            picture,
            bio,
            instagram
          }
        });

        return user;
      }
    });

    t.field("saveWorkout", {
      type: "Workout",
      args: {
        input: "SaveWorkoutInput"
      },
      resolve: async (root, { input }, ctx) => {
        const workout = await ctx.prisma.workout.create({
          data: {
            title: input.title,
            slug: slug(input.title),
            user: {
              connect: {
                id: ctx.user.id
              }
            }
          }
        });

        for (const exercise of input?.exercises) {
          for (const set of exercise.sets) {
            const log = await ctx.prisma.workoutLog.create({
              data: {
                exercise: {
                  connect: {
                    id: exercise.id
                  }
                },
                workout: {
                  connect: {
                    id: workout.id
                  }
                },
                user: {
                  connect: {
                    id: ctx.user.id
                  }
                },
                weight: set.weight,
                reps: set.reps
              }
            });
          }
        }

        return workout;
      }
    });
  }
});

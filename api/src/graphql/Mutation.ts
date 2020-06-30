import { schema } from "nexus";
import { extract } from "oembed-parser";
import slug from "slug";

export const Mutation = schema.mutationType({
  definition(t) {
    t.crud.createOneBodyweight({
      authorize: () => false,
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
        url: schema.stringArg({ nullable: false }),
        title: schema.stringArg({ nullable: false }),
        artist: schema.stringArg({ nullable: false }),
        provider: schema.stringArg({ nullable: false }),
        thumbnail: schema.stringArg({ nullable: false }),
      },
      resolve: async (
        root,
        { url, title, artist, provider, thumbnail },
        ctx
      ) => {
        if (!ctx.user) throw new Error("Not Authorized!");

        const profileSong = await ctx.db.profileSong.create({
          data: {
            url,
            title,
            artist,
            provider: provider,
            thumbnail: thumbnail,
            user: {
              connect: {
                id: ctx.user?.id,
              },
            },
          },
        });

        return profileSong;
      },
    });

    t.field("editProfile", {
      type: "User",
      args: {
        picture: schema.stringArg({
          nullable: false,
        }),
        bio: schema.stringArg({
          nullable: true,
        }),
        instagram: schema.stringArg({
          nullable: true,
        }),
      },
      resolve: async (root, { picture, bio, instagram }, ctx) => {
        if (!ctx.user) throw new Error("Not Authorized!");

        const user = ctx.db.user.update({
          where: {
            id: ctx.user?.id,
          },
          data: {
            picture,
            bio,
            instagram,
          },
        });

        return user;
      },
    });

    t.field("saveWorkout", {
      type: "Workout",
      args: {
        input: "SaveWorkoutInput",
      },
      resolve: async (root, { input }, ctx) => {
        if (!ctx.user) throw new Error("Not Authorized!");
        if (!input) throw new Error("No workout data was received.");

        let workout;
        if (input?.workoutId) {
          workout = await ctx.db.workout.update({
            where: {
              id: input.workoutId,
            },
            data: {
              title: input.title,
              slug: slug(input.title),
            },
          });
        } else {
          workout = await ctx.db.workout.create({
            data: {
              title: input.title,
              slug: slug(input.title),
              user: {
                connect: {
                  id: ctx.user.id,
                },
              },
            },
          });
        }

        for (const exercise of input?.exercises) {
          for (const set of exercise.sets) {
            let log;
            if (set.logId) {
              log = await ctx.db.workoutLog.update({
                where: {
                  id: set.logId,
                },
                data: {
                  weight: set.weight,
                  reps: set.reps,
                },
              });
            } else {
              log = await ctx.db.workoutLog.create({
                data: {
                  exercise: {
                    connect: {
                      id: exercise.id,
                    },
                  },
                  workout: {
                    connect: {
                      id: workout.id,
                    },
                  },
                  user: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                  weight: set.weight,
                  reps: set.reps,
                },
              });
            }
          }
        }

        if (input.deleteLogs?.length) {
          const deleted = await ctx.db.workoutLog.deleteMany({
            where: {
              id: { in: input.deleteLogs },
            },
          });
        }

        return workout;
      },
    });
  },
});

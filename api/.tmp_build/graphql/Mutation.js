"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const nexus_1 = require("nexus");
const slug_1 = require("slug");
exports.Mutation = nexus_1.schema.mutationType({
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
                url: nexus_1.schema.stringArg(),
                title: nexus_1.schema.stringArg(),
                artist: nexus_1.schema.stringArg(),
                provider: nexus_1.schema.stringArg(),
                thumbnail: nexus_1.schema.stringArg(),
            },
            resolve: (root, { url, title, artist, provider, thumbnail }, ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const profileSong = yield ctx.db.profileSong.create({
                    data: {
                        url,
                        title,
                        artist,
                        provider: provider,
                        thumbnail: thumbnail,
                        user: {
                            connect: {
                                id: (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id,
                            },
                        },
                    },
                });
                return profileSong;
            }),
        });
        t.field("editProfile", {
            type: "User",
            args: {
                picture: nexus_1.schema.stringArg({
                    nullable: true,
                }),
                bio: nexus_1.schema.stringArg({
                    nullable: true,
                }),
                instagram: nexus_1.schema.stringArg({
                    nullable: true,
                }),
            },
            resolve: (root, { picture, bio, instagram }, ctx) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                const user = ctx.prisma.users.update({
                    where: {
                        id: (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id,
                    },
                    data: {
                        picture,
                        bio,
                        instagram,
                    },
                });
                return user;
            }),
        });
        t.field("saveWorkout", {
            type: "Workout",
            args: {
                input: "SaveWorkoutInput",
            },
            resolve: (root, { input }, ctx) => __awaiter(this, void 0, void 0, function* () {
                let workout;
                if (input === null || input === void 0 ? void 0 : input.workoutId) {
                    workout = yield ctx.db.workout.update({
                        where: {
                            id: input.workoutId,
                        },
                        data: {
                            title: input.title,
                            slug: slug_1.default(input.title),
                        },
                    });
                }
                else {
                    workout = yield ctx.prisma.workout.create({
                        data: {
                            title: input.title,
                            slug: slug_1.default(input.title),
                            user: {
                                connect: {
                                    id: ctx.user.id,
                                },
                            },
                        },
                    });
                }
                for (const exercise of input === null || input === void 0 ? void 0 : input.exercises) {
                    for (const set of exercise.sets) {
                        let log;
                        if (set.logId) {
                            log = yield ctx.db.workoutLog.update({
                                where: {
                                    id: set.logId,
                                },
                                data: {
                                    weight: set.weight,
                                    reps: set.reps,
                                },
                            });
                        }
                        else {
                            log = yield ctx.db.workoutLog.create({
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
                if (input === null || input === void 0 ? void 0 : input.deleteLogs.length) {
                    const deleted = yield ctx.prisma.workoutLog.deleteMany({
                        where: {
                            id: { in: input.deleteLogs },
                        },
                    });
                }
                return workout;
            }),
        });
    },
});

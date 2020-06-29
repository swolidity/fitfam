import { schema } from "nexus";
import { extract } from "oembed-parser";
import AWS from "aws-sdk";
import uuid from "uuid";

export const Query = schema.queryType({
  definition(t) {
    t.crud.user();
    t.crud.users({
      type: "User",
      ordering: true,
    });

    t.crud.bodyweight({});
    t.crud.bodyweights({
      type: "Bodyweight",
      ordering: true,
    });

    t.crud.exercise();
    t.crud.exercises({
      filtering: true,
    });

    t.list.field("onetrack", {
      type: "Exercise",
      args: {
        name: schema.stringArg(),
      },
      resolve: async (root, { name }, ctx) => {
        return await ctx.db.exercise.findMany({
          where: {
            name: {
              contains: name,
            },
          },
        });
      },
    });

    t.field("getLoggedInUser", {
      type: "User",
      nullable: true,
      resolve: async (root, args, ctx) => {
        return ctx.user;
      },
    });

    t.crud.workout();

    t.crud.supplements();

    t.field("oembed", {
      type: "Oembed",
      args: {
        url: schema.stringArg(),
      },
      resolve: async (root, { url }, ctx) => {
        const oembed = await extract(url);

        return oembed;
      },
    });

    t.field("getPresignedUploadUrl", {
      type: schema.scalarType({
        name: "PresignedUploadURL",
        serialize(value) {
          return value;
        },
      }),
      args: {
        directory: schema.stringArg(),
      },
      resolve: async (root, { directory }, ctx) => {
        const key = `${directory}/${uuid.v4()}`;

        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
          region: "us-east-1",
        });

        let url;
        try {
          url = await s3.getSignedUrlPromise("putObject", {
            Bucket: "fitfam-uploads",
            Key: key,
            ContentType: "image/*",
            ACL: "public-read",
            Expires: 300,
          });
        } catch (e) {
          console.log(e.message);
        }

        console.log("url", url);

        return url;
      },
    });
  },
});

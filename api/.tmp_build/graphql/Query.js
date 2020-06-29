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
exports.Query = void 0;
const nexus_1 = require("nexus");
const oembed_parser_1 = require("oembed-parser");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
exports.Query = nexus_1.schema.queryType({
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
                name: nexus_1.schema.stringArg(),
            },
            resolve: (root, { name }, ctx) => __awaiter(this, void 0, void 0, function* () {
                return yield ctx.db.exercise.findMany({
                    where: {
                        name: {
                            contains: name,
                        },
                    },
                });
            }),
        });
        t.field("getLoggedInUser", {
            type: "User",
            nullable: true,
            resolve: (root, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                return ctx.user;
            }),
        });
        t.crud.workout();
        t.crud.supplements();
        t.field("oembed", {
            type: "Oembed",
            args: {
                url: nexus_1.schema.stringArg(),
            },
            resolve: (root, { url }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const oembed = yield oembed_parser_1.extract(url);
                return oembed;
            }),
        });
        t.field("getPresignedUploadUrl", {
            type: nexus_1.schema.scalarType({
                name: "PresignedUploadURL",
                serialize(value) {
                    return value;
                },
            }),
            args: {
                directory: nexus_1.schema.stringArg(),
            },
            resolve: (root, { directory }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const key = `${directory}/${uuid_1.default.v4()}`;
                const s3 = new aws_sdk_1.default.S3({
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
                    region: "us-east-1",
                });
                let url;
                try {
                    url = yield s3.getSignedUrlPromise("putObject", {
                        Bucket: "fitfam-uploads",
                        Key: key,
                        ContentType: "image/*",
                        ACL: "public-read",
                        Expires: 300,
                    });
                }
                catch (e) {
                    console.log(e.message);
                }
                console.log("url", url);
                return url;
            }),
        });
    },
});

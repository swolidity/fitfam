const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const helmet = require("helmet");
const app = express();
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";

const cachePrisma: PrismaClient | null = null;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.API_URL}/facebook-auth`,
      scope: ["email"],
      profileFields: ["id", "name", "picture", "email"]
    },
    async (accessToken, refreshToken, { _json: profile }, cb) => {
      const prisma: PrismaClient = cachePrisma
        ? cachePrisma
        : new PrismaClient();

      const { first_name, last_name, email }: any = profile;
      const name = `${first_name} ${last_name}`;
      const username = first_name.toLowerCase();

      const user = await prisma.user.upsert({
        where: {
          email
        },
        update: {
          name,
          username,
          email,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
        },
        create: {
          name,
          username,
          email,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
        }
      });

      return cb(null, user);
    }
  )
);

// add some security-related headers to the response
app.use(helmet());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(passport.initialize());

app.get(
  "*",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"],
    profileFields: ["id", "name", "picture", "email"]
  }),
  (req: any, res: any) => {
    const user = req.user;
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.redirect("/" + user.username);
  }
);

module.exports = app;

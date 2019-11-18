const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const helmet = require("helmet");
const app = express();
const jwt = require("jsonwebtoken");
import { Photon } from "@generated/photon";

let cachePhoton: Photon | null = null;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.API_URL}/facebook-auth`,
      profileFields: ["id", "displayName", "picture", "email"]
    },
    async (accessToken, refreshToken, { _json: profile }, cb) => {
      const photon: Photon = cachePhoton ? cachePhoton : new Photon();

      console.log("profile", profile);

      const { name, email }: any = profile;

      const user = await photon.users.upsert({
        where: {
          email
        },
        update: {
          name,
          email,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
        },
        create: {
          name,
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
    scope: ["id", "displayName", "picture", "email"]
  }),
  (req: any, res: any) => {
    const user = req.user;
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token);
    res.redirect("/" + user.username);
  }
);

module.exports = app;

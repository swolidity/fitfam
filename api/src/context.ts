import { Photon, User } from "@prisma/photon";

import jwt from "jsonwebtoken";

const photon = new Photon();

const getUser = async (photon: Photon, token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return null;

      let user;

      try {
        user = await photon.users.findOne({
          where: {
            id: decoded.user_id
          }
        });
      } catch (e) {
        throw new Error("User does not exist.");
      }

      return user;
    }
  );
};

export type Context = {
  photon: Photon;
  user: null | User;
};

export const createContext = async (req): Promise<Context> => {
  // get the user token from the headers
  let token = req.headers.authorization || "";

  let user = null;

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    // try to retrieve a user with the token
    user = await getUser(photon, token);
  }

  return {
    photon,
    user
  };
};

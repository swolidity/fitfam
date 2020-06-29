import { PrismaClient, User } from "@prisma/client";

import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getUser = async (prisma: PrismaClient, token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return null;

      let user;

      try {
        user = await prisma.user.findOne({
          where: {
            id: decoded.user_id,
          },
        });
      } catch (e) {
        throw new Error("User does not exist.");
      }

      return user;
    }
  );
};

export type Context = {
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
    user = await getUser(prisma, token);
  }

  return user;
};

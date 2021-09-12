import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const { users } = new PrismaClient();

export const getUsers = async (_: any, res: Response) => {
  const allUsers = await users.findMany({
    select: {
      username: true,
      posts: true,
    },
  });

  res.status(200).json(allUsers);
};

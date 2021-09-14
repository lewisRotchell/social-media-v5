import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const { users } = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExists = await users.findUnique({
    where: {
      username: username,
    },
  });

  // const emailExists = await users.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });

  if (userExists) {
    return res.status(400).json({
      msg: "This username is already taken",
    });
  }

  const hashedPassword = await argon2.hash(password);

  // try {
  //   await users.create({});
  // } catch (err) {}
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
};

import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const { users } = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await argon2.hash(password);

  try {
    const newUser = await users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    console.log(err);
  }
  return;
};

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
// };

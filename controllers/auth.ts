import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { verify } from "jsonwebtoken";
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

//Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await users.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) {
    return res.status(400).json({ msg: "Wrong credentials" });
  }

  const valid = await argon2.verify(user.password, password);
  if (!valid) {
    return res.status(400).json({ msg: "Wrong credentials" });
  }

  //login success
  user.password = "";

  sendRefreshToken(res, createRefreshToken(user));

  return res.status(200).json({
    accessToken: createAccessToken(user),
    user,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.COOKIE_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await users.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  //refesh the refresh token
  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};

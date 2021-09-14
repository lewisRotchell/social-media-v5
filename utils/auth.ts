import { sign } from "jsonwebtoken";

export const createAccessToken = (user: any) => {
  return sign({ userId: user.id }, process.env.JSONWEBTOKENSECRET as string, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: any) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.COOKIE_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

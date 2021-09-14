import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { check, validationResult } from "express-validator";

const { users } = new PrismaClient();

export const validateRegister = [
  check("email")
    .escape()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email can not be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid Email")
    .bail()
    .custom(async (email) => {
      const existingEmail = await users.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (existingEmail) {
        throw new Error(`Email already in use`);
      }
    }),
  check("username")
    .escape()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty")
    .bail()
    .isLength({ min: 3, max: 15 })
    .withMessage("Username should be between 3 and 15 characters")
    .bail()
    .custom(async (username) => {
      const existingUsername = await users.findUnique({
        where: {
          username: username.toLowerCase(),
        },
      });
      if (existingUsername) {
        throw new Error(`Username already in use`);
      }
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
    return;
  },
];

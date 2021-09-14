import express from "express";
import { validateRegister } from "../validations/user";
import { register, login, refreshToken } from "../controllers/auth";

const router = express.Router();
router.route("/register").post(validateRegister, register);
router.route("/login").post(login);
router.route("/refresh_token").post(refreshToken);

export default router;

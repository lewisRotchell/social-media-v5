import express from "express";
import { validateUser } from "../validations/user";
import { register } from "../controllers/auth";

const router = express.Router();
router.route("/register").post(validateUser, register);
// router.route("/login").post(login);

export default router;

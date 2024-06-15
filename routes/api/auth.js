import { Router } from "express";
import {
  loginUser,
  registerUser,
  updatePassword,
} from "../../controllers/authControllers.js";

export const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/password", updatePassword);

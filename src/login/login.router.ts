import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { LoginController } from "./login.controller";

export const loginRouter = Router();

const loginConroller = new LoginController();

loginRouter
  .post('/', loginConroller.createLogin)
  .get('/profile', authMiddleware, loginConroller.getProfile);
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { loginValidatorSchema } from "../validator/login.validator";
import { LoginController } from "./login.controller";

export const loginRouter = Router();

const loginConroller = new LoginController();

loginRouter
  .post('/', loginValidatorSchema, validationMiddleware, loginConroller.createLogin)
  .get('/profile', authMiddleware, loginConroller.getProfile);
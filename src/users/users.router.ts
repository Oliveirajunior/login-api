import { Router } from "express";
import { validationMiddleware } from "../middleware/validation.middleware";
import { userValidatorSchema } from "../validator/users.validator";
import { UserController } from "./users.controller";

export const itemsRouter = Router();

const userController = new UserController();

itemsRouter
  .get('/', userController.findAll)
  .get('/:id', userController.findOne)
  .post('/', userValidatorSchema, validationMiddleware, userController.create)
  .delete('/:id', userController.remove);
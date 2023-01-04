import { Router } from "express";
import { UserController } from "./users.controller";

export const itemsRouter = Router();

const userController = new UserController();

itemsRouter
  .get('/', userController.findAll)
  .get('/:id', userController.findOne)
  .post('/', userController.create)
  .delete('/:id', userController.remove);
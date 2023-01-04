import { Request, Response } from "express";
import { User } from "@prisma/client";
import { Router } from "express";
import * as userService from "./users.service"

export const itemsRouter = Router();

itemsRouter
  .get('/', async (_req:Request, res:Response):Promise<Response> => {
    const users:User[] = await userService.findAll();
    return res.status(200).json(users);
})

  .get('/:id', async (req:Request, res:Response):Promise<Response> => {
    const {id} = req.params;
    const user:User|null = await userService.findOne(id);
    return res.status(200).json(user);
  })

  .post('/', async (req:Request, res:Response):Promise<Response> => {
    const {name, email, password} = req.body;
    await userService.create(name, email, password);
    return res.status(201).send("item created");
  })

  .delete('/:id', async(req:Request, res:Response):Promise<Response> => {
    const {id} = req.params;
    await userService.remove(id);
    return res.status(200).send("item removed");
  })
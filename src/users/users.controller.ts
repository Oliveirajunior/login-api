import { Request, Response } from "express";
import { User } from "@prisma/client";
import {UserService} from "./users.service";
import bcrypt from 'bcrypt';

const userService = new UserService();

export class UserController {
  
  async findAll (_req: Request, res: Response): Promise<Response> {
    try {
      const users: User[] = await userService.findAll();
      return res.status(200).json(users);

    } catch (error: any) {
      return res.status(500).json(error.message);
    }
};

  async findOne (req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params;
      const user: User|null = await userService.findOne(id);

      return res.status(200).json(user);
    
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  };

  async create (req: Request, res: Response): Promise<Response> {
    try {
      const {name, email, password} = req.body;
      const userExists: User|null = await userService.findByMail(email);
      
      if(userExists) {
      return res.status(400).json("user already exists");
    }

      const hashPassword: string = await bcrypt.hash(password, 10);
      await userService.create(name, email, hashPassword);

      return res.status(201).json("user created");

    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  };

  async remove (req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params;
      const userSelected: User|null = await userService.findOne(id);
      
      if (userSelected) {
        await userService.remove(id);
        return res.status(204).json("user removed"); 
      }    
      
      return res.status(404).json("user does not exist");

    } catch (error: any) {
      return res.status(500).json(error.message);
    }

  };

};
import { Router, Request, Response } from "express";
import { UserService } from "../users/users.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const loginRouter = Router();

const userService = new UserService();

loginRouter.post('/', async (req:Request, res:Response) => {
  const {email, password} = req.body;

  const user:User|null = await userService.findByMail(email);

  if(!user) {
    res.status(404).send('Email is invalid');
    
  } else {
    const passwordCheck:boolean = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status(404).send('Password is invalid');

    } else {
      const secret:string = process.env.JWT_SECRET?.toString() || 'MASTERKEY';
      const token:string = jwt.sign({ id:user.id }, secret, { expiresIn: '1h' });
      const {password, ...userLogin} = user;
      
      res.status(200).json({
        user: userLogin,
        token: token,

      });
    }
  };
});
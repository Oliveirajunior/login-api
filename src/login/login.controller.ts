import { Request, Response } from "express";
import { UserService } from "../users/users.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const userService = new UserService();

const secret:string = process.env.JWT_SECRET as string;

type JwtPayload = {
  id: string
};

export class LoginController {
  async createLogin (req:Request, res:Response) {

    const {email, password} = req.body;

    const user:User|null = await userService.findByMail(email);

    if(!user) {
      res.status(404).send('email or password is invalid');
      
    } else {
      const passwordCheck:boolean = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        res.status(404).send('email or password is invalid');

      } else {

        const token:string = jwt.sign({ id:user.id }, secret, { expiresIn: '1h' });

        const {password, ...userLogin} = user;

        res.status(200).json({
          user: userLogin,
          token: token,

        });
      }
    };
  };

  async getProfile (req:Request, res:Response) {
    return res.status(200).json(req.user);
  };

};
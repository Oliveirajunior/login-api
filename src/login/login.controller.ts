import { Request, Response } from "express";
import { UserService } from "../users/users.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const userService = new UserService();

const secret:string = process.env.JWT_SECRET as string;

export class LoginController {
  async createLogin (req:Request, res:Response):Promise<Response> {

    try {
      const {email, password} = req.body;

      const user:User|null = await userService.findByMail(email);

    if(!user) {
      return res.status(404).json('email or password is invalid');
      
    } else {
      const passwordCheck:boolean = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        return res.status(404).json('email or password is invalid');

      } else {

        const token:string = jwt.sign({ id:user.id }, secret, { expiresIn: '1h' });

        const {password, ...userLogin} = user;

        return res.status(200).json({
          user: userLogin,
          token: token,

        });
      }
    };
    } catch (error:any) {
      return res.status(500).json(error.message);
    }
  };

  async getProfile (req:Request, res:Response) {
    try {
      return res.status(200).json(req.user);
    } catch (error:any) {
      return res.status(500).json(error.message);
    }
  };

};
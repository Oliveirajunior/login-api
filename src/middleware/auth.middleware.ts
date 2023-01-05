import { Request, Response, NextFunction } from "express";
import { UserService } from "../users/users.service";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const userService = new UserService();

const secret:string = process.env.JWT_SECRET as string;

type JwtPayload = {
  id: string
};

export const authMiddleware = async (req:Request, res:Response, next: NextFunction) => {
  const {authorization} = req.headers;

  if(!authorization) {
    return res.status(401).send('this user not have authorization');
  }

  const token = authorization.split(' ')[1];
  
  const {id} = jwt.verify(token, secret) as JwtPayload;

  const user:User|null = await userService.findOne(id);

  if(!user) {
    return res.status(401).send('this user not have authorization');
  }

  const {password, ...loggedUser} = user;

  req.user = loggedUser;

  next(); 

}
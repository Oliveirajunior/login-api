import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

export class UserService {
  findAll ():Promise<User[]> {
    return prisma.user.findMany();  
  };

  findOne (id:string):Promise<User | null> {
    return prisma.user.findUnique({where: {id}})
  };

  findByMail (email:string):Promise<User | null> {
    return prisma.user.findUnique({where: {email}})
  };

  create (name:string, email:string, password:string):Promise<User> {
    return prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
  };

  remove (id:string):Promise<User> {
    return prisma.user.delete({where:{id}})
 };

};
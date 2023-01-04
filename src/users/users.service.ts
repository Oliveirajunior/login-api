import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

export const findAll = ():Promise<User[]> => {
  return prisma.user.findMany();  
};

export const findOne = (id:string):Promise<User | null> => {
  return prisma.user.findUnique({where: {id}})
};

export const create = (name:string, email:string, password:string):Promise<User> => {
  return prisma.user.create({
    data: {
      name,
      email,
      password
    }
  })
};

export const remove = (id:string):Promise<User> => {
  return prisma.user.delete({where:{id}})
}
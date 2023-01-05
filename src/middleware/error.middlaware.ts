import { HttpException } from "../common/http-exception";
import { Request, Response, NextFunction, response } from "express";

export const errorHandler = (error: HttpException, _req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || error.status || 500;

  res.status(status).send(error);

};
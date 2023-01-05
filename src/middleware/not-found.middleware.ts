import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (_req: Request, res: Response, next: NextFunction) => {
  const message = 'Resource not found';

  res.status(404).send(message);

};
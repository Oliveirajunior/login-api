import { Request, Response, NextFunction } from "express";
import { ValidationError, validationResult } from "express-validator";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const message: ValidationError[] = errors.array();
    return res.status(400).json(message);

  }

  next();

};
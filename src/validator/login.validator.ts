import { body } from "express-validator";

export const loginValidatorSchema = [
  body('email')
    .isEmail().withMessage('EMAIL must be a e-mail adress'),
  body('password')
    .isString().withMessage('PASSWORD must be string')
    .isLength({min:6}).withMessage('PASSWORD must be at least 6 chars long')
];
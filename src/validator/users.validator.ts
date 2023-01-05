import { body } from "express-validator";

export const userValidatorSchema = [
  body('name')
    .isString().withMessage('NAME must be text')
    .not().isNumeric().withMessage('NAME must not be number')
    .isLength({min:4, max: 20}).withMessage('NAME must be between 4 and 20 characters'),
  body('email')
    .isEmail().withMessage('EMAIL must be a e-mail adress'),
  body('password')
    .isString().withMessage('PASSWORD must be string')
    .isLength({min:6}).withMessage('PASSWORD must be at least 6 chars long')
];
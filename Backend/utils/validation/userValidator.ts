import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import UserModel from "../../schemas/userSchema";


export const createUserValidator: RequestHandler[] = [
    check('name')
        .notEmpty().withMessage('User\'s name is required')
        .isLength({ min: 7, max: 20 }).withMessage('Name length should be between 7 and 20'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email')
        .custom(async (val: string) => {
            const user = await UserModel.findOne({ email: val });
            if (user) { throw new Error(`Email already exists`) }
            return true;
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char')
        .custom((val: string, { req }) => {
            if (val !== req.body.confirmPassword) { throw new Error("Passwords don't match") }
            return true;
        }),
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password is required')
        .isLength({ min: 8, max: 20 }).withMessage('confirm password length should be between 8 and 20 char'),
    validatorMiddleware
];

export const updateUserValidator: RequestHandler[] = [
    check('name').optional()
        .isLength({ min: 7, max: 20 }).withMessage('User\'s name length should be between 7 and 20'),
    check('active').optional()
        .isBoolean().withMessage('Invalid active value'),
    validatorMiddleware
];

export const getUserValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
];

export const deleteUserValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
];

export const changePasswordValidation: RequestHandler[] = [
    check('id')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid User ID'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char'),
    validatorMiddleware
]
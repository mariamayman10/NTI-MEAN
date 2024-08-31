import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import UserModel from "../../schemas/userSchema";
import bcrypt from 'bcryptjs';


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
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char'),
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password is required')
        .isLength({ min: 8, max: 20 }).withMessage('confirm password length should be between 8 and 20 char')
        .custom((val: string, { req }) => {
            if (val !== req.body.password) { throw new Error("Passwords don't match") }
            return true;
        }),
    validatorMiddleware
];

export const updateUserValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
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

export const changePasswordValidator: RequestHandler[] = [
    check('userId')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid User ID'),
    check('currentPassword')
        .notEmpty().withMessage('Current password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char'),
    check('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char'),
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Confirm password\'s length should be between 8 and 20 char')
        .custom((val: string, { req }) => {
            if (val != req.body.password) { throw new Error("Passwords don't match") }
            return true
        }),
    validatorMiddleware
];

export const updateSignedInUserValidator: RequestHandler[] = [
    check('name').optional()
        .isLength({ min: 7, max: 20 }).withMessage('User\'s name length should be between 7 and 20'),
    validatorMiddleware
];

export const changeSignedInPasswordValidator: RequestHandler[] = [
    check('currentPassword')
        .notEmpty().withMessage('Current password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char')
        .custom(async (val, {req}) =>{
            const user = await UserModel.findById(req.user._id);
            const isCorrect = await bcrypt.compare(val, user!.password);
            if(!isCorrect){
                throw new Error('Invalid current password');
            }
            return true;
        }),
    check('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password\'s length should be between 8 and 20 char'),
    check('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .isLength({ min: 8, max: 20 }).withMessage('Confirm password\'s length should be between 8 and 20 char')
    .custom((val: string, { req }) => {
        if (val != req.body.newPassword) { throw new Error("Passwords don't match") }
        return true;
    }),
    validatorMiddleware
];


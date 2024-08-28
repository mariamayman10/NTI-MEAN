import Jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import {Request, Response, NextFunction} from "express";
import UserModel from '../schemas/userSchema';
import bcrypt from 'bcryptjs';
import ApiErrors from '../utils/apiErrors';
import { createToken } from '../utils/createToken';

export const signUp = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const user = await UserModel.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({token, data: user});
});

export const signIn = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiErrors('Invalid email or password', 401));
    }
    const token = createToken(user._id);
    res.status(200).json({ token, message: 'logged in successfully' });
});

export const applyProtection = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('3');
    // check if token exist
    let token: string = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) // check if there is a token, and its type is bearer
        token = req.headers.authorization.split(' ')[1];
    else return next(new ApiErrors('Login first to be able to access', 401));
    console.log(token);
    // check if token is still active
    const decryptedToken:any = Jwt.verify(token, process.env.JWT_SECRET_KEY!);
    
    // check if user exist
    const user = await UserModel.findById(decryptedToken._id);
    if(!user) return next(new ApiErrors('User doesn\'t exist', 401));

    // check if password changed
    if(user.passwordChangedAt instanceof Date){
        const lastChanged: number = user.passwordChangedAt.getTime() / 1000;
        if(lastChanged > decryptedToken.iat) return next(new ApiErrors('Login again', 401));
    }
    req.user = user;
    next();
});

export const allowedTo = (...roles: string[]) => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!(roles.includes(req.user?.role ?? ''))) {
        return next(new ApiErrors('You don\'t have the permission', 403))
    }
    next();
});

export const checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.active) {
        return next(new ApiErrors('You are not active', 403))
    }
    next();
});


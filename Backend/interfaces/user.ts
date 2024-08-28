import { Document } from "mongoose";

export interface User extends Document{
    name: string;
    email: string;
    password: string;
    image: string; 
    role: 'manager' | 'admin' | 'user';
    active: boolean;
    passwordChangedAt: Date | number;
    resetCode: string;
    resetCodeExpireTime: Date | number;
    resetCodeVerify: boolean;
}
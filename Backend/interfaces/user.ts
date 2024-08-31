import { Document } from "mongoose";
import Product from "./product";
import { Address } from "./address";

export interface User extends Document{
    name: string;
    email: string;
    password: string;
    image: string; 
    wishlist: Product[];
    addresses: Address[];
    role: 'manager' | 'admin' | 'user';
    active: boolean;
    passwordChangedAt: Date | number;
    resetCode: string | undefined;
    resetCodeExpireTime: Date | number | undefined;
    resetCodeVerify: boolean | undefined;
}
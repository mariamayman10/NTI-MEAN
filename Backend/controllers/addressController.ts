import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../schemas/userSchema';
import ApiErrors from '../utils/apiErrors';
import { User } from '../interfaces/user';
import AddressModel from '../schemas/addressSchema';
import { getDocument } from './controllerInterface';
import { Address } from '../interfaces/address';


export const addAddress = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const address = await AddressModel.create(req.body);
    if (!address) return next(new ApiErrors('Address creation failed', 500));
    const user = await UserModel.findByIdAndUpdate(
        req.user?._id,
        { $addToSet: { addresses:  address._id} },
        { new: true, runValidators: true }
    )
    if (!user) return next(new ApiErrors('User not found', 404));
    res.status(200).json({ data: user?.addresses });
});
export const removeAddress = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user: User | null = await UserModel.findByIdAndUpdate(req.user?._id, {
        $pull: { addresses: req.params.addressId }
    }, { new: true, runValidators: true});
    if (!user) return next(new ApiErrors('User not found', 404));
    res.status(200).json({ data: user?.addresses })
});

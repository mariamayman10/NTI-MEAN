import SubcategoryModel from "../schemas/subcategorySchema";
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from "express";
import ApiErrors from "../utils/apiErrors";

export const createSubcategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const subcategory = await SubcategoryModel.create(req.body);
    res.status(201).json({data: subcategory});
});

export const updateSubcategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const subcategory = await SubcategoryModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
    if(!subcategory){return next(new ApiErrors('No subcategory with such an id', 404))};
    res.status(200).json({data: subcategory});
});

export const deleteSubcategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const subcategory = await SubcategoryModel.findByIdAndDelete(req.params.id);
    if(!subcategory){return next(new ApiErrors('No subcategory with such an id', 404))};
    res.status(200).json();
});

export const getSubcategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const subcategory = await SubcategoryModel.findById(req.params.id);
    if(!subcategory){return next(new ApiErrors('No subcategory with such an id', 404))};
    res.status(200).json({data: subcategory});
});

export const getSubcategories = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const subcategories = await SubcategoryModel.find();
    res.status(200).json({data: subcategories});
});



import CategoryModel from "../schemas/categorySchema";
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from "express";
import ApiErrors from "../utils/apiErrors";

export const createCategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const category = await CategoryModel.create(req.body);
    res.status(201).json({data: category});
});

export const updateCategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
    if(!category){return next(new ApiErrors('No category with such an id', 404))};
    res.status(200).json({data: category});
});

export const deleteCategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if(!category){return next(new ApiErrors('No category with such an id', 404))};
    res.status(200).json();
});

export const getCategory = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const category = await CategoryModel.findById(req.params.id);
    if(!category){return next(new ApiErrors('No category with such an id', 404))};
    res.status(200).json({data: category});
});

export const getCategories = asyncHandler (async (req: Request, res:Response, next:NextFunction) => {
    const categories = await CategoryModel.find();
    res.status(200).json({data: categories});
});



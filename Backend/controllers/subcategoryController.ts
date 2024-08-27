import SubcategoryModel from "../schemas/subcategorySchema";
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from "./controllerInterface";
import Subcategory from "../interfaces/subcategory";
import { NextFunction, Request, Response } from "express";
import FilterData from "../interfaces/filterData";

export const createSubcategory = createDocument<Subcategory>(SubcategoryModel);

export const updateSubcategory = updateDocument<Subcategory>(SubcategoryModel);

export const deleteSubcategory = deleteDocument<Subcategory>(SubcategoryModel);

export const getSubcategory = getDocument<Subcategory>(SubcategoryModel);

export const getSubcategories = getDocuments<Subcategory>(SubcategoryModel, 'subcategory');

export const filterData = (req:Request, res:Response, next: NextFunction) => {
    let filterDataObj:FilterData = {};
    if(req.params.categoryId){
        filterDataObj.category = req.params.categoryId;
    }
    req.filterData = filterDataObj;
    next();
}
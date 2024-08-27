import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import SubcategoryModel from "../../schemas/subcategorySchema";
import Subcategory from "../../interfaces/subcategory";


export const getCategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo ID'), validatorMiddleware
];

export const createCategoryValidator: RequestHandler[] = [
    check('name')
    .notEmpty().withMessage('Category\'s name is required')
    .isLength({min:2, max:20}).withMessage('Category\'s name must have length between 2 and 20'),
    validatorMiddleware
];

export const deleteCategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo ID')
    .custom(async (val) => {
        const subcategories: Subcategory[] = await SubcategoryModel.find({category: val});
        if(subcategories.length > 0){
            await SubcategoryModel.bulkWrite(
                subcategories.map((subcategory: Subcategory) => ({
                    deleteOne: {filter: {_id:subcategory.id}}
                }))
            );
        }
        return true;
    }),
    validatorMiddleware
];

export const updateCategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo ID'),
    check('name')
    .notEmpty().withMessage('Subcategory\'s name is required')
    .isLength({min:2, max:20}).withMessage('Subcategory\'s name must have length between 2 and 20'),
    validatorMiddleware
];
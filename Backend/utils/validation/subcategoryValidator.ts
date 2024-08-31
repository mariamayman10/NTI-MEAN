import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import CategoryModel from "../../schemas/categorySchema";


export const getSubcategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo ID'), validatorMiddleware
];

export const createSubcategoryValidator: RequestHandler[] = [
    check('name')
        .notEmpty().withMessage('Subcategory\'s name is required')
        .isLength({min:2, max:20}).withMessage('Subcategory\'s name must have length between 2 and 20'),
    check('category')
        .notEmpty().withMessage('Subcategory\'s category is required')
        .isMongoId().withMessage('Subcategory\'s category is invalid')
        .custom(async (val) => {
            const category = await CategoryModel.findById(val);
            if (!category) {
                throw new Error('Category Not Found');
            }
            return true;
        }),
    check('image').optional(),
    validatorMiddleware
];

export const deleteSubcategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo ID'), validatorMiddleware
];

export const updateSubcategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo ID'),
    check('name').optional()
        .notEmpty().withMessage('Subcategory\'s name is required')
        .isLength({min:2, max:20}).withMessage('Subcategory\'s name must have length between 2 and 20'),
    check('category').optional()
        .notEmpty().withMessage('Subcategory\'s category is required')
        .isMongoId().withMessage('Subcategory\'s category is invalid')
        .custom(async (val) => {
            const category = await CategoryModel.findById(val);
            if (!category) {
                throw new Error('Category Not Found');
            }
            return true;
        }),
    validatorMiddleware
];
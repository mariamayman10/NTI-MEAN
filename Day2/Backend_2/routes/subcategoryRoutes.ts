import { Router } from "express";
import { createSubcategory, deleteSubcategory, getSubcategories, getSubcategory, updateSubcategory } from "../controllers/subcategoryController";
import { param } from "express-validator";
import { validatorMiddleware } from "../middlewares/validatorMiddleware";
import { createSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utils/validation/subcategoryValidator";
import { deleteSubcategoryValidator } from './../utils/validation/subcategoryValidator';

const SubcategoryRoutes: Router = Router();

SubcategoryRoutes.route('/')
    .get(getSubcategories)
    .post(createSubcategoryValidator,createSubcategory);
SubcategoryRoutes.route('/:id')
    .get(getSubcategoryValidator, getSubcategory)
    .delete(deleteSubcategoryValidator, deleteSubcategory)
    .put(updateSubcategoryValidator ,updateSubcategory);

export default SubcategoryRoutes;
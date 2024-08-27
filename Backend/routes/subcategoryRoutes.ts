import { Router } from "express";
import { createSubcategory, deleteSubcategory, filterData, getSubcategories, getSubcategory, updateSubcategory } from "../controllers/subcategoryController";
import { createSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utils/validation/subcategoryValidator";
import { deleteSubcategoryValidator } from './../utils/validation/subcategoryValidator';
import ProductRoutes from "./productRoutes";

const SubcategoryRoutes: Router = Router({mergeParams: true});

SubcategoryRoutes.use('/:subcategoryId/product',ProductRoutes);

SubcategoryRoutes.route('/')
    .get(filterData, getSubcategories)
    .post(createSubcategoryValidator,createSubcategory);
SubcategoryRoutes.route('/:id')
    .get(getSubcategoryValidator, getSubcategory)
    .delete(deleteSubcategoryValidator, deleteSubcategory)
    .put(updateSubcategoryValidator ,updateSubcategory);

export default SubcategoryRoutes;
import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validation/categoryValidator";
import SubcategoryRoutes from "./subcategoryRoutes";

const CategoryRoutes: Router = Router();

CategoryRoutes.use('/:categoryId/subcategory', SubcategoryRoutes);

CategoryRoutes.route('/')
    .get(getCategories)
    .post(createCategoryValidator,createCategory);
CategoryRoutes.route('/:id')
    .get(getCategoryValidator,getCategory)
    .delete(deleteCategoryValidator,deleteCategory)
    .put(updateCategoryValidator,updateCategory);

export default CategoryRoutes;
import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validation/categoryValidator";

const CategoryRoutes: Router = Router();

CategoryRoutes.route('/')
    .get(getCategories)
    .post(createCategoryValidator,createCategory);
CategoryRoutes.route('/:id')
    .get(getCategoryValidator,getCategory)
    .delete(deleteCategoryValidator,deleteCategory)
    .put(updateCategoryValidator,updateCategory);

export default CategoryRoutes;
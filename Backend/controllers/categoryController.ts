import CategoryModel from "../schemas/categorySchema";
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from "./controllerInterface";
import Category from "../interfaces/category";

export const createCategory = createDocument<Category>(CategoryModel);

export const updateCategory = updateDocument<Category>(CategoryModel);

export const deleteCategory = deleteDocument<Category>(CategoryModel);

export const getCategory = getDocument<Category>(CategoryModel)

export const getCategories = getDocuments<Category>(CategoryModel, 'category');

